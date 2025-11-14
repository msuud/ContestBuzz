import React, { useState, useEffect, useRef } from "react";
import ContestSlider from "../components/home/ContestSlider";
import { getCategorizedContests } from "../services/contestService";
import { useAuth } from "../context/AuthContext";
import styled from "styled-components";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const PageContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  position: relative;
  overflow: hidden;
  background: #ffffff; /* WHITE BACKGROUND */
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
  padding: 1rem;
`;

const CTAButton = styled.button`
  background: linear-gradient(to right, #2f692dff, #2f692dff);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 1rem auto;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(139, 92, 246, 0.5);
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  flex-direction: column;
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
  text-align: center;
  padding: 2.5rem;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ErrorMessage = styled.div`
  background-color: rgba(239, 68, 68, 0.9);
  color: white;
  padding: 1rem;
  border-radius: 0.375rem;
  display: inline-block;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(5px);
`;

const HomePage = () => {
  const [contests, setContests] = useState({
    upcoming: [],
    ongoing: [],
    past: [],
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchContests = async () => {
      try {
        const contestData = await getCategorizedContests();
        setContests(contestData);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch contests. Please try again later.");
        setLoading(false);
      }
    };

    fetchContests();
  }, []);

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
        <ErrorMessage>{error}</ErrorMessage>
      </ErrorContainer>
    );
  }

  const displayContests =
    contests.ongoing.length > 0 ? contests.ongoing : contests.upcoming;

  if (displayContests.length === 0) {
    return (
      <ErrorContainer>
        <ErrorMessage>No contests available at the moment.</ErrorMessage>
      </ErrorContainer>
    );
  }

  return (
    <PageContainer>
      <ContentWrapper>
        <ContestSlider contests={displayContests} />
        <CTAButton onClick={() => navigate("/contests")}>
          Explore Contests <FaArrowRight />
        </CTAButton>
      </ContentWrapper>
    </PageContainer>
  );
};

export default HomePage;
