import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { getPlatformIcon } from "../../utils/platformIcon";

const FilterContainer = styled.div`
  background: #fffff;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  backdrop-filter: blur(10px);
  border: 3px solid rgba(1, 30, 16, 0.2);
`;

const FilterHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const FilterTitle = styled.h3`
  font-size: 1.25rem;
  color: white;
  margin: 0;
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  background-image: linear-gradient(to right, #03450bff, #03450bff);
  font-weight: 600;
`;

const ClearButton = styled.button`
  background: transparent;
  border: none;
  color: #092e0cff;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;

  &:hover {
    background: rgba(6, 78, 16, 0.1);
    text-decoration: underline;
  }
`;

const PlatformsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem; /* More spacing between buttons */

  @media (max-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const PlatformButton = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0.75rem;
  width: 100%;
  border-radius: 8px;
  background-color: ${(props) =>
    props.selected ? "rgba(3, 63, 29, 0.85)" : "rgba(2, 90, 40, 0.85)"};
  color: ${(props) => (props.selected ? "white" : "#e2e8f0")};
  border: 1px solid
    ${(props) =>
      props.selected ? "rgba(2, 90, 40, 0.85)" : "rgba(2, 90, 40, 0.85)"};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${(props) =>
      props.selected ? "rgba(2, 90, 40, 0.85)" : "rgba(2, 90, 40, 0.85)"};
    border-color: ${(props) =>
      props.selected ? "rgba(2, 90, 40, 0.85)" : "rgba(2, 90, 40, 0.85)"};
  }
`;

const IconWrapper = styled.div`
  display: flex;
  margin-right: 0.75rem;
`;

const PlatformName = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-transform: capitalize;
`;

const PlatformFilter = ({
  platforms,
  selectedPlatforms,
  onSelectPlatform,
  onClearFilters,
}) => {
  return (
    <FilterContainer>
      <FilterHeader>
        <FilterTitle>Filter by Platform</FilterTitle>
        {selectedPlatforms.length > 0 && (
          <ClearButton onClick={onClearFilters}>Clear all filters</ClearButton>
        )}
      </FilterHeader>

      <PlatformsGrid>
        {platforms.map((platform) => (
          <PlatformButton
            key={platform}
            selected={selectedPlatforms.includes(platform)}
            onClick={() => onSelectPlatform(platform)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <IconWrapper>{getPlatformIcon(platform, 32)}</IconWrapper>
            <PlatformName>{platform}</PlatformName>
          </PlatformButton>
        ))}
      </PlatformsGrid>
    </FilterContainer>
  );
};

export default PlatformFilter;
