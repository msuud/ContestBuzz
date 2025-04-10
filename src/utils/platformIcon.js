import React from "react";
import { FaCode } from "react-icons/fa";
import {
  SiLeetcode,
  SiCodeforces,
  SiGeeksforgeeks,
  SiCodechef,
} from "react-icons/si";

/**
 * Returns the appropriate icon component for a given platform
 * @param {string} platform - The platform name
 * @param {number} size - The size of the icon (default: 20)
 * @returns {JSX.Element} - The icon component
 */
export const getPlatformIcon = (platform, size = 20) => {
  const platformLower = platform.toLowerCase();

  const iconMap = {
    leetcode: <SiLeetcode size={size} color="#FFA116" />,
    codeforces: <SiCodeforces size={size} color="#1F8ACB" />,
    codechef: <SiCodechef size={size} color="#5B4638" />,
    atcoder: <FaCode size={size} color="#fffff" />,
    geeksforgeeks: <SiGeeksforgeeks size={size} color="#4CAF50" />,
  };

  for (const key in iconMap) {
    if (platformLower === key || platformLower.includes(key)) {
      return iconMap[key];
    }
  }

  return <FaCode size={size} color="#718096" />;
};

export default {
  getPlatformIcon,
};
