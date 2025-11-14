import React, { useState, useEffect, useRef } from "react";
import { getCategorizedContests } from "../services/contestService";
import ContestCard from "../components/contests/ContestCard";
import PlatformFilter from "../components/contests/PlatformFilter";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import styled from "styled-components";

const PageContainer = styled.div`
  min-height: 100vh;
  background: #ffffff; /* WHITE background */
  padding: 1rem;
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const HeaderContainer = styled.div`
  text-align: center;
  margin-bottom: 0.5rem;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  color: #1f6f2e;
  margin-bottom: 1rem;
  margin-top: 4rem;
  position: relative;
  display: inline-block;
  padding-bottom: 0.5rem;

  &::after {
    content: "";
    position: absolute;
    left: 50%;
    bottom: -6px;
    transform: translateX(-50%);
    width: 700px;
    height: 4px;
    background: #2f692d;
    border-radius: 3px;
  }
`;

const Subtitle = styled.p`
  color: #0c6f0cff;
  max-width: 42rem;
  margin: 0 auto;
  font-size: 1.125rem;
  line-height: 1.75;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const FilterContainer = styled.div`
  padding: 1.5rem 0;
  margin-bottom: 0.5rem;
  background: transparent;
  border-radius: 0.75rem;
  backdrop-filter: blur(8px);
  padding: 1.5rem;
`;

const TabsContainer = styled.div`
  padding: 1.5rem 0 2rem;
`;

const StyledTabList = styled(TabList)`
  display: flex;
  justify-content: center;
  gap: 5rem;
  margin-bottom: 2rem;
`;

const StyledTab = styled(Tab)`
  padding: 0.75rem 1.5rem;
  border-radius: 100px;
  font-size: 1.125rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;

  &.react-tabs__tab--selected {
    transform: none;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }

  &:first-child {
    background: linear-gradient(to right, #0a8336fc, #01532bff);
    color: white;
    &:hover {
      transform: scale(1.05);
    }
  }

  &:last-child {
    background: linear-gradient(to right, #0a8337ff, #01532bff);
    border-radius: 100px;
    color: white;
    &:hover {
      transform: scale(1.05);
    }
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1.5rem;
  padding: 1.25rem;
  margin: 0 auto;
  width: 100%;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1280px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 1rem;
  background: #ffffff;
  border-radius: 0.75rem;
  backdrop-filter: blur(8px);
`;

const EmptyIcon = styled.div`
  display: inline-block;
  padding: 1.5rem;
  border-radius: 9999px;
  background-color: rgba(55, 65, 81, 0.3);
  margin-bottom: 1.5rem;
`;

const EmptyText = styled.p`
  color: #9ca3af;
  font-size: 1.25rem;
  margin-bottom: 1.5rem;
`;

const ClearButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #0e9517ff;
  color: white;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
  font-weight: 500;

  &:hover {
    background-color: #045109ff;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  flex-direction: column;
  position: relative;
`;

const LoadingText = styled.p`
  color: #ffffff;
  margin-top: 1rem;
  font-weight: bold;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
  animation: pulse 2s infinite;

  @keyframes pulse {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
`;

const ErrorContainer = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  position: relative;
`;

const ErrorBox = styled.div`
  background-color: rgba(239, 68, 68, 0.8);
  color: white;
  padding: 1.5rem;
  border-radius: 0.75rem;
  max-width: 28rem;
  margin: 0 auto;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(248, 113, 113, 0.5);
`;

const ErrorTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

const ErrorButton = styled.button`
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: white;
  color: #ef4444;
  border-radius: 0.375rem;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    background-color: #f3f4f6;
  }
`;

const ContestsPage = () => {
  const [contests, setContests] = useState({
    upcoming: [],
    ongoing: [],
  });
  const [filteredContests, setFilteredContests] = useState({
    upcoming: [],
    ongoing: [],
  });
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const availablePlatforms = [
    "leetcode",
    "codeforces",
    "codechef",
    "atcoder",
    "geeksforgeeks",
  ];

  useEffect(() => {
    const fetchContests = async () => {
      try {
        const contestData = await getCategorizedContests();
        setContests(contestData);
        setFilteredContests(contestData);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch contests. Please try again later.");
        setLoading(false);
      }
    };

    fetchContests();
  }, []);

  useEffect(() => {
    if (selectedPlatforms.length === 0) {
      setFilteredContests(contests);
      return;
    }

    const filtered = {
      upcoming: contests.upcoming.filter((contest) =>
        selectedPlatforms.some((platform) =>
          contest.platform.toLowerCase().includes(platform.toLowerCase())
        )
      ),
      ongoing: contests.ongoing.filter((contest) =>
        selectedPlatforms.some((platform) =>
          contest.platform.toLowerCase().includes(platform.toLowerCase())
        )
      ),
    };

    setFilteredContests(filtered);
  }, [selectedPlatforms, contests]);

  const handlePlatformSelect = (platform) => {
    if (selectedPlatforms.includes(platform)) {
      setSelectedPlatforms(selectedPlatforms.filter((p) => p !== platform));
    } else {
      setSelectedPlatforms([...selectedPlatforms, platform]);
    }
  };

  const clearFilters = () => {
    setSelectedPlatforms([]);
  };

  if (loading) {
    return (
      <LoadingContainer>
        <LoadingText>Loading contests...</LoadingText>
      </LoadingContainer>
    );
  }

  if (error) {
    return (
      <ErrorContainer>
        <ErrorBox>
          <ErrorTitle>Error</ErrorTitle>
          <p>{error}</p>
          <ErrorButton onClick={() => window.location.reload()}>
            Try Again
          </ErrorButton>
        </ErrorBox>
      </ErrorContainer>
    );
  }

  return (
    <PageContainer>
      <ContentContainer>
        <HeaderContainer>
          <Title>Programming Contests</Title>
          <Subtitle>
            Find and track programming contests from all major platforms. Filter
            by platform and get reminders for upcoming contests.
          </Subtitle>
        </HeaderContainer>

        <FilterContainer>
          <PlatformFilter
            platforms={availablePlatforms}
            selectedPlatforms={selectedPlatforms}
            onSelectPlatform={handlePlatformSelect}
            onClearFilters={clearFilters}
          />
        </FilterContainer>

        <TabsContainer>
          <Tabs>
            <StyledTabList>
              <StyledTab>Ongoing ({filteredContests.ongoing.length})</StyledTab>
              <StyledTab>
                Upcoming ({filteredContests.upcoming.length})
              </StyledTab>
            </StyledTabList>

            <TabPanel>
              {filteredContests.ongoing.length > 0 ? (
                <GridContainer>
                  {filteredContests.ongoing.map((contest) => (
                    <ContestCard
                      key={contest.id}
                      contest={contest}
                      status="ongoing"
                    />
                  ))}
                </GridContainer>
              ) : (
                <EmptyState>
                  <EmptyIcon>
                    <svg
                      width="48"
                      height="48"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </EmptyIcon>
                  <EmptyText>
                    No ongoing contests found for selected platforms.
                  </EmptyText>
                  <ClearButton onClick={clearFilters}>
                    Clear Filters
                  </ClearButton>
                </EmptyState>
              )}
            </TabPanel>

            <TabPanel>
              {filteredContests.upcoming.length > 0 ? (
                <GridContainer>
                  {filteredContests.upcoming.map((contest) => (
                    <ContestCard
                      key={contest.id}
                      contest={contest}
                      status="upcoming"
                    />
                  ))}
                </GridContainer>
              ) : (
                <EmptyState>
                  <EmptyIcon>
                    <svg
                      width="48"
                      height="48"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </EmptyIcon>
                  <EmptyText>
                    No upcoming contests found for selected platforms.
                  </EmptyText>
                  <ClearButton onClick={clearFilters}>
                    Clear Filters
                  </ClearButton>
                </EmptyState>
              )}
            </TabPanel>
          </Tabs>
        </TabsContainer>
      </ContentContainer>
    </PageContainer>
  );
};

export default ContestsPage;
