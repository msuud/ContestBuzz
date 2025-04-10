import React, { createContext, useContext, useState, useEffect } from "react";
import { getAllContests } from "../services/contestService";

const ContestContext = createContext();

export const useContests = () => useContext(ContestContext);

export function ContestProvider({ children }) {
  const [contests, setContests] = useState([]);
  const [filteredContests, setFilteredContests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);

  const [contestCategories, setContestCategories] = useState({
    upcoming: [],
    ongoing: [],
    past: [],
  });

  useEffect(() => {
    const getContests = async () => {
      try {
        setLoading(true);
        const data = await getAllContests();
        setContests(data);

        categorizeContests(data);

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    getContests();
  }, []);

  useEffect(() => {
    if (selectedPlatforms.length === 0) {
      setFilteredContests(contests);
    } else {
      const filtered = contests.filter((contest) =>
        selectedPlatforms.includes(contest.platform)
      );
      setFilteredContests(filtered);
    }

    categorizeContests(filteredContests);
  }, [selectedPlatforms, contests]);

  const categorizeContests = (contestArray) => {
    const now = new Date();

    const upcoming = contestArray.filter(
      (contest) => new Date(contest.start_time) > now
    );

    const ongoing = contestArray.filter(
      (contest) =>
        new Date(contest.start_time) <= now && new Date(contest.end_time) > now
    );

    const past = contestArray.filter(
      (contest) => new Date(contest.end_time) < now
    );

    setContestCategories({
      upcoming,
      ongoing,
      past,
    });
  };

  const togglePlatformFilter = (platform) => {
    if (selectedPlatforms.includes(platform)) {
      setSelectedPlatforms(selectedPlatforms.filter((p) => p !== platform));
    } else {
      setSelectedPlatforms([...selectedPlatforms, platform]);
    }
  };

  const value = {
    contests,
    filteredContests,
    loading,
    error,
    contestCategories,
    selectedPlatforms,
    togglePlatformFilter,
  };

  return (
    <ContestContext.Provider value={value}>{children}</ContestContext.Provider>
  );
}
