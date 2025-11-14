import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("authToken");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export const fetchContestsFromBackend = async () => {
  try {
    const res = await api.get("/api/clist/contests");
    return res.data?.data ?? null;
  } catch (err) {
    console.error("Failed to fetch contests from backend:", err);
    return null;
  }
};

const mockAPI = {
  async getContests() {
    const platforms = [
      "codeforces",
      "leetcode",
      "hackerrank",
      "codechef",
      "atcoder",
      "topcoder",
    ];
    const now = new Date();
    const contests = [];

    for (let i = 0; i < 10; i++) {
      const startTime = new Date(now);
      startTime.setDate(
        startTime.getDate() - Math.floor(Math.random() * 30) - 1
      );
      const endTime = new Date(startTime);
      endTime.setHours(endTime.getHours() + Math.floor(Math.random() * 5) + 1);

      contests.push({
        id: `past-${i}`,
        name: `Past Contest ${i + 1}`,
        platform: platforms[Math.floor(Math.random() * platforms.length)],
        url: `https://example.com/contest/${i}`,
        start_time: startTime.toISOString(),
        end_time: endTime.toISOString(),
        duration: (endTime - startTime) / (1000 * 60 * 60),
      });
    }

    for (let i = 0; i < 3; i++) {
      const startTime = new Date(now);
      startTime.setHours(
        startTime.getHours() - Math.floor(Math.random() * 5) - 1
      );
      const endTime = new Date(now);
      endTime.setHours(endTime.getHours() + Math.floor(Math.random() * 5) + 1);

      contests.push({
        id: `ongoing-${i}`,
        name: `Ongoing Contest ${i + 1}`,
        platform: platforms[Math.floor(Math.random() * platforms.length)],
        url: `https://example.com/contest/ongoing-${i}`,
        start_time: startTime.toISOString(),
        end_time: endTime.toISOString(),
        duration: (endTime - startTime) / (1000 * 60 * 60),
      });
    }

    for (let i = 0; i < 15; i++) {
      const startTime = new Date(now);
      startTime.setDate(
        startTime.getDate() + Math.floor(Math.random() * 14) + 1
      );
      const endTime = new Date(startTime);
      endTime.setHours(endTime.getHours() + Math.floor(Math.random() * 5) + 1);

      contests.push({
        id: `upcoming-${i}`,
        name: `Upcoming Contest ${i + 1}`,
        platform: platforms[Math.floor(Math.random() * platforms.length)],
        url: `https://example.com/contest/${i}`,
        start_time: startTime.toISOString(),
        end_time: endTime.toISOString(),
        duration: (endTime - startTime) / (1000 * 60 * 60),
      });
    }

    return contests;
  },
};

export { api, mockAPI };
export default api;
