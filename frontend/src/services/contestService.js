import api from "./api";

export const getAllContests = async () => {
  const res = await api.get("/api/clist/contests");
  const { past, ongoing, upcoming } = res.data.data;

  return [...past, ...ongoing, ...upcoming];
};

export const getCategorizedContests = async () => {
  const res = await api.get("/api/clist/contests");
  return res.data.data;
};

export const getContestsByPlatform = async (platforms) => {
  const res = await api.get("/api/clist/contests");
  const { past, ongoing, upcoming } = res.data.data;

  const all = [...past, ...ongoing, ...upcoming];

  if (!platforms?.length) return all;

  return all.filter((contest) =>
    platforms.some((p) =>
      contest.platform.toLowerCase().includes(p.toLowerCase())
    )
  );
};

export default {
  getAllContests,
  getCategorizedContests,
  getContestsByPlatform,
};
