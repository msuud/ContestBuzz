const axios = require("axios");

const username = "urvadave2";
const apiKey = process.env.CLIST_API_KEY;
const clistApiUrl = "https://clist.by/api/v1/contest/";

const platforms = [
  "leetcode.com",
  "hackerrank.com",
  "codeforces.com",
  "topcoder.com",
  "codechef.com",
  "atcoder.jp",
  "hackerearth.com",
  "codewars.com",
  "geeksforgeeks.org",
];

const formatDate = (date) => date.toISOString().replace("T", " ").split(".")[0];

exports.getAllContests = async () => {
  const now = new Date();

  const oneMonthAgo = new Date(now);
  oneMonthAgo.setMonth(now.getMonth() - 1);

  const oneMonthLater = new Date(now);
  oneMonthLater.setMonth(now.getMonth() + 1);

  try {
    const response = await axios.get(clistApiUrl, {
      headers: {
        Authorization: `ApiKey ${username}:${apiKey}`,
      },
      params: {
        username,
        api_key: apiKey,
        start__gte: formatDate(oneMonthAgo),
        end__lte: formatDate(oneMonthLater),
        resource__name__in: platforms.join(","),
        order_by: "start",
        limit: 500,
      },
    });

    return response.data.objects.map((contest) => ({
      id: contest.id,
      name: contest.event,
      platform: contest.resource.name.split(".")[0],
      start_time: contest.start,
      end_time: contest.end,
      duration: contest.duration,
      url: contest.href,
      resource_id: contest.resource.id,
      resource_icon: contest.resource.icon,
    }));
  } catch (error) {
    console.error("CLIST API Error:", error.response?.data || error.message);
    throw error;
  }
};

exports.getCategorizedContests = async () => {
  const contests = await exports.getAllContests();
  const now = new Date();

  const past = [];
  const ongoing = [];
  const upcoming = [];

  contests.forEach((contest) => {
    const start = new Date(contest.start_time);
    const end = new Date(contest.end_time);

    if (end < now) past.push(contest);
    else if (start <= now && end >= now) ongoing.push(contest);
    else upcoming.push(contest);
  });

  return {
    past: past.sort((a, b) => new Date(b.start_time) - new Date(a.start_time)),
    ongoing,
    upcoming: upcoming.sort(
      (a, b) => new Date(a.start_time) - new Date(b.start_time)
    ),
  };
};

exports.getContestsByPlatform = async (selectedPlatforms = []) => {
  const contests = await exports.getAllContests();
  if (selectedPlatforms.length === 0) return contests;

  return contests.filter((contest) =>
    selectedPlatforms.some((platform) =>
      contest.platform.toLowerCase().includes(platform.toLowerCase())
    )
  );
};
