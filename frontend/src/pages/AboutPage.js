import React from "react";
import styled from "styled-components";
import {
  FaEnvelope,
  FaTwitter,
  FaGithub,
  FaLinkedin,
  FaArrowRight,
  FaHeart,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

/* MAIN PAGE CONTAINER */
const PageContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  background: #ffffff;
  color: #1e293b;
  padding-bottom: 4rem;
`;

/* CONTENT WRAPPER */
const ContentContainer = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
`;

/* HEADER */
const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  color: #1f6f2e; /* Deep green */
  margin-bottom: 1rem;
  margin-top: 4rem;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #475569;
  max-width: 600px;
  margin: 0 auto;
  padding-bottom: 1rem;
  border-bottom: 3px solid #2f692d;
`;

/* SECTION TITLES */
const SectionTitle = styled.h2`
  font-size: 1.8rem;
  color: #1f6f2e;
  font-weight: 700;
  margin-bottom: 1.2rem;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    width: 60px;
    height: 4px;
    bottom: -6px;
    left: 0;
    background: #2f692d;
    border-radius: 3px;
  }
`;

/* TEXT SECTIONS */
const AboutSection = styled.div`
  margin-bottom: 4rem;
`;

const AboutText = styled.p`
  font-size: 1.1rem;
  color: #334155;
  line-height: 1.7;
  margin-bottom: 1rem;
`;

/* FEATURES GRID */
const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
  gap: 1.8rem;
  margin-top: 1.5rem;
`;

const FeatureCard = styled.div`
  background: #f9fafb;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  padding: 1.4rem;
  transition: 0.25s ease;
  cursor: pointer;

  &:hover {
    border-color: #2f692d;
    transform: translateY(-4px);
  }
`;

const FeatureTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: #1f6f2e;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 0.5rem;
`;

const FeatureDescription = styled.p`
  color: #475569;
  font-size: 0.95rem;
  line-height: 1.5;
`;

/* BUTTON */
const CTAButton = styled.button`
  background: #2f692d;
  color: white;
  border: none;
  padding: 0.8rem 1.8rem;
  border-radius: 8px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin: 2rem auto;
  cursor: pointer;
  transition: 0.3s ease;
  font-size: 1rem;

  &:hover {
    background: #245523;
    transform: translateY(-2px);
  }
`;

const FooterText = styled.p`
  text-align: center;
  color: #475569;
  font-size: 1rem;
  margin-top: 2rem;
`;

const Heart = styled(FaHeart)`
  color: #e11d48;
  transform: translateY(2px);
`;

const AboutPage = () => {
  const navigate = useNavigate();

  return (
    <PageContainer>
      <ContentContainer>
        <Header>
          <Title>About ContestBuzz</Title>
          <Subtitle>
            Track all programming contests in one clean, simple dashboard.
          </Subtitle>
        </Header>

        {/* MISSION */}
        <AboutSection>
          <SectionTitle>Our Mission</SectionTitle>
          <AboutText>
            ContestBuzz helps competitive programmers stay updated with all
            upcoming programming contests in one place — clean, simple,
            distraction-free.
          </AboutText>
          <AboutText>
            No more switching between LeetCode, CodeChef, Codeforces, AtCoder,
            and dozens of other websites. Everything you need is organized in a
            single beautiful interface.
          </AboutText>

          {/* FEATURES */}
          <SectionTitle>Key Features</SectionTitle>
          <FeatureGrid>
            <FeatureCard>
              <FeatureTitle>
                <FaGithub /> All Platforms Together
              </FeatureTitle>
              <FeatureDescription>
                View contests from LeetCode, Codeforces, CodeChef, AtCoder,
                HackerEarth and more — all in one place.
              </FeatureDescription>
            </FeatureCard>

            <FeatureCard>
              <FeatureTitle>
                <FaEnvelope /> Email Alerts
              </FeatureTitle>
              <FeatureDescription>
                Get notified before contests start so you never miss an event.
              </FeatureDescription>
            </FeatureCard>

            <FeatureCard>
              <FeatureTitle>
                <FaTwitter /> Calendar Integration
              </FeatureTitle>
              <FeatureDescription>
                Add contests to your personal calendar with one click.
              </FeatureDescription>
            </FeatureCard>

            <FeatureCard>
              <FeatureTitle>
                <FaLinkedin /> Smart Filters
              </FeatureTitle>
              <FeatureDescription>
                Filter contests by platform and duration to find exactly what
                suits you.
              </FeatureDescription>
            </FeatureCard>
          </FeatureGrid>

          <CTAButton onClick={() => navigate("/contests")}>
            Explore Contests <FaArrowRight />
          </CTAButton>

          <FooterText>
            Made with <Heart /> for the competitive programming community.
          </FooterText>
        </AboutSection>
      </ContentContainer>
    </PageContainer>
  );
};

export default AboutPage;
