import axios from "axios";

export const getAllContests = async () => {
  const username = "urvadave2";
  const apiKey = "7227d458479a47a81ee6407c4f5f17363933d95e";
  const clistApiUrl = "https://clist.by/api/v1/contest/";

  // Define platforms we want to fetch
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

  // Get dates for 1 month before and 1 month after
  const now = new Date();

  const oneMonthAgo = new Date(now);
  oneMonthAgo.setMonth(now.getMonth() - 1);
  oneMonthAgo.setHours(0, 0, 0, 0);

  const oneMonthLater = new Date(now);
  oneMonthLater.setMonth(now.getMonth() + 1);
  oneMonthLater.setDate(oneMonthLater.getDate() + 1);
  oneMonthLater.setHours(23, 59, 59, 999);

  // Format dates for API request
  const formatDate = (date) => {
    return date.toISOString().replace("T", " ").split(".")[0];
  };

  const startDate = formatDate(oneMonthAgo);
  const endDate = formatDate(oneMonthLater);

  try {
    const response = await axios.get(clistApiUrl, {
      headers: {
        Authorization: `ApiKey ${username}:${apiKey}`,
      },
      params: {
        username: username,
        api_key: apiKey,
        start__gte: startDate,
        end__lte: endDate,
        resource__name__in: platforms.join(","),
        order_by: "start",
        limit: 500,
      },
    });

    // Transform the response to a more usable format
    const contests = response.data.objects.map((contest) => ({
      id: contest.id,
      name: contest.event,
      platform: contest.resource.name
        .replace(".com", "")
        .replace(".org", "")
        .replace(".jp", ""),
      start_time: contest.start,
      end_time: contest.end,
      duration: contest.duration,
      url: contest.href,
      resource_id: contest.resource.id,
      resource_icon: contest.resource.icon,
    }));

    return contests;
  } catch (error) {
    console.error("Error fetching contests from CLIST API:", error);
    if (error.response) {
      console.error("Error response data:", error.response.data);
      console.error("Error response status:", error.response.status);
    }
    throw error;
  }
};

export const getCategorizedContests = async () => {
  try {
    const allContests = await getAllContests();
    const now = new Date();

    const pastContests = [];
    const ongoingContests = [];
    const upcomingContests = [];

    allContests.forEach((contest) => {
      const startTime = new Date(contest.start_time);
      const endTime = new Date(contest.end_time);

      if (endTime < now) {
        pastContests.push(contest);
      } else if (startTime <= now && endTime >= now) {
        ongoingContests.push(contest);
      } else {
        upcomingContests.push(contest);
      }
    });

    // Sort contests by start time
    pastContests.sort(
      (a, b) => new Date(b.start_time) - new Date(a.start_time)
    );
    upcomingContests.sort(
      (a, b) => new Date(a.start_time) - new Date(b.start_time)
    );

    return {
      past: pastContests,
      ongoing: ongoingContests,
      upcoming: upcomingContests,
    };
  } catch (error) {
    console.error("Error categorizing contests:", error);
    throw error;
  }
};

export const getContestsByPlatform = async (selectedPlatforms) => {
  try {
    const allContests = await getAllContests();

    if (!selectedPlatforms || selectedPlatforms.length === 0) {
      return allContests;
    }

    return allContests.filter((contest) =>
      selectedPlatforms.some((platform) =>
        contest.platform.toLowerCase().includes(platform.toLowerCase())
      )
    );
  } catch (error) {
    console.error("Error fetching contests by platform:", error);
    throw error;
  }
};

export default {
  getAllContests,
  getCategorizedContests,
  getContestsByPlatform,
};
