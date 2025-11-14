import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { getPlatformIcon } from "../../utils/platformIcon";

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
`;

const getPlatformGradient = (platform) => {
  const gradients = {
    LeetCode:
      "linear-gradient(135deg, rgba(255, 160, 0, 0.2) 0%, rgba(255, 120, 0, 0.3) 100%)",
    CodeForces:
      "linear-gradient(135deg, rgba(0, 100, 200, 0.2) 0%, rgba(0, 80, 170, 0.3) 100%)",

    CodeChef:
      "linear-gradient(135deg, rgba(120, 80, 40, 0.2) 0%, rgba(100, 60, 20, 0.3) 100%)",
    AtCoder:
      "linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(220, 220, 220, 0.3) 100%)",

    GeeksforGeeks:
      "linear-gradient(135deg, rgba(0, 150, 0, 0.2) 0%, rgba(0, 130, 0, 0.3) 100%)",
  };

  return (
    gradients[platform] ||
    "linear-gradient(135deg, rgba(30, 41, 59, 0.5) 0%, rgba(30, 41, 59, 0.7) 100%)"
  );
};

const PlatformCard = styled(motion.div)`
  background: ${(props) => getPlatformGradient(props.platform)};
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.2);
    border-color: rgba(255, 255, 255, 0.15);
  }
`;

const IconContainer = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const PlatformName = styled.h3`
  color: white;
  font-size: 1.125rem;
  font-weight: 700;
  margin: 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const PlatformCount = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.875rem;
  margin-top: 0.5rem;
`;

const PlatformGrid = () => {
  const platforms = [
    { name: "LeetCode", count: "Weekly Contests" },
    { name: "CodeForces", count: "Regular Rounds" },
    { name: "CodeChef", count: "Cook-offs & Challenges" },
    { name: "AtCoder", count: "Beginner & Regular Contests" },
    { name: "GeeksforGeeks", count: "Coding Competitions" },
  ];

  return (
    <GridContainer>
      {platforms.map((platform, index) => (
        <PlatformCard
          key={platform.name}
          platform={platform.name}
          whileHover={{ y: -5 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <IconContainer>{getPlatformIcon(platform.name, 32)}</IconContainer>
          <PlatformName>{platform.name}</PlatformName>
          <PlatformCount>{platform.count}</PlatformCount>
        </PlatformCard>
      ))}
    </GridContainer>
  );
};

export default PlatformGrid;
