import React, { useState, useEffect, useRef } from "react";
import { getCategorizedContests } from "../services/contestService";
import ContestCard from "../components/contests/ContestCard";
import PlatformFilter from "../components/contests/PlatformFilter";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import styled from "styled-components";

const PageContainer = styled.div`
  min-height: 100vh;
  position: relative;
  padding: 1rem;
  overflow: hidden;
  @media (min-width: 768px) {
    padding: 2rem;
  }
`;

const BackgroundCanvas = styled.canvas`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
`;

const BackgroundOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 0;
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
  font-size: 2.25rem;
  font-weight: 700;
  margin-bottom: 0.2rem;
  background: linear-gradient(to right, #818cf8, #ec4899, #ef4444);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  font-family: "Poppins", sans-serif;
  @media (min-width: 768px) {
    font-size: 3rem;
  }
  @media (min-width: 1024px) {
    font-size: 3.75rem;
  }
`;

const Subtitle = styled.p`
  color: #ffffff;
  max-width: 42rem;
  margin: 0 auto;
  font-size: 1.125rem;
  line-height: 1.75;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const FilterContainer = styled.div`
  padding: 1.5rem 0;
  margin-bottom: 0.5rem;
  background: rgba(15, 23, 42, 0.7);
  border-radius: 0.75rem;
  backdrop-filter: blur(8px);
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const FilterTitle = styled.h2`
  color: #e5e7eb;
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
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
    background: linear-gradient(to right, #4ade80, #3b82f6);
    color: white;
    &:hover {
      transform: scale(1.05);
    }
  }

  &:last-child {
    background: linear-gradient(to right, #a855f7, #ec4899);
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
  background: rgba(15, 23, 42, 0.7);
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
  background-color: #9333ea;
  color: white;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
  font-weight: 500;

  &:hover {
    background-color: #7e22ce;
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

const FunInteractiveBackground = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: null, y: null, radius: 150 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasSize();

    window.addEventListener("resize", setCanvasSize);

    const updateMousePosition = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };
    window.addEventListener("mousemove", updateMousePosition);

    const updateTouchPosition = (e) => {
      if (e.touches.length > 0) {
        mouseRef.current.x = e.touches[0].clientX;
        mouseRef.current.y = e.touches[0].clientY;
      }
    };
    window.addEventListener("touchmove", updateTouchPosition);
    window.addEventListener("touchstart", updateTouchPosition);

    const resetMousePosition = () => {
      mouseRef.current.x = null;
      mouseRef.current.y = null;
    };
    window.addEventListener("mouseleave", resetMousePosition);
    window.addEventListener("touchend", resetMousePosition);

    const colorPalette = [
      "#FF3366", // Pink
      "#33CCFF", // Blue
      "#FFCC33", // Yellow
      "#66FF66", // Green
      "#CC66FF", // Purple
      "#FF6633", // Orange
    ];

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 5 + 2;
        this.baseSize = this.size;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.color =
          colorPalette[Math.floor(Math.random() * colorPalette.length)];
        this.pulseSpeed = 0.01 + Math.random() * 0.03;
        this.angle = Math.random() * 360;
        this.pulseDirection = Math.random() > 0.5 ? 1 : -1;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width) this.speedX = -this.speedX;
        if (this.y < 0 || this.y > canvas.height) this.speedY = -this.speedY;

        if (mouseRef.current.x != null) {
          const dx = this.x - mouseRef.current.x;
          const dy = this.y - mouseRef.current.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < mouseRef.current.radius) {
            const force =
              (mouseRef.current.radius - distance) / mouseRef.current.radius;
            const directionX = dx / distance || 0;
            const directionY = dy / distance || 0;
            this.speedX += directionX * force * 0.5;
            this.speedY += directionY * force * 0.5;

            const maxSpeed = 5;
            const currentSpeed = Math.sqrt(
              this.speedX * this.speedX + this.speedY * this.speedY
            );
            if (currentSpeed > maxSpeed) {
              this.speedX = (this.speedX / currentSpeed) * maxSpeed;
              this.speedY = (this.speedY / currentSpeed) * maxSpeed;
            }

            this.size = this.baseSize + 3 * force;
          } else {
            this.size = this.baseSize + (this.size - this.baseSize) * 0.9;
          }
        } else {
          this.size = this.baseSize + (this.size - this.baseSize) * 0.9;
        }

        this.angle += this.pulseDirection * this.pulseSpeed;

        this.speedX *= 0.99;
        this.speedY *= 0.99;
      }

      draw() {
        const opacity = 0.5 + 0.5 * Math.sin(this.angle);

        const glow = ctx.createRadialGradient(
          this.x,
          this.y,
          0,
          this.x,
          this.y,
          this.size + 8
        );

        glow.addColorStop(0, this.color);
        glow.addColorStop(1, "rgba(0,0,0,0)");

        ctx.globalAlpha = opacity * 0.7;
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size + 8, 0, Math.PI * 2);
        ctx.fill();

        ctx.globalAlpha = opacity;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }

    const particles = [];
    const particleCount = Math.min(
      80,
      Math.floor((canvas.width * canvas.height) / 15000)
    );

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    let gradientAngle = 0;

    const drawBackground = () => {
      gradientAngle += 0.002;
      const gradient = ctx.createLinearGradient(
        0,
        0,
        canvas.width,
        canvas.height
      );

      const time = Date.now() * 0.0002;
      const r1 = Math.sin(time) * 50 + 30;
      const g1 = Math.cos(time * 0.7) * 30 + 20;
      const b1 = Math.sin(time * 0.5) * 50 + 100;

      const r2 = Math.cos(time * 0.8) * 30 + 20;
      const g2 = Math.sin(time * 0.3) * 50 + 100;
      const b2 = Math.cos(time * 0.6) * 50 + 50;

      gradient.addColorStop(0, `rgb(${r1}, ${g1}, ${b1})`);
      gradient.addColorStop(1, `rgb(${r2}, ${g2}, ${b2})`);

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    function connectParticles() {
      const maxDistance = 120;

      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            const opacity = 1 - distance / maxDistance;

            const gradient = ctx.createLinearGradient(
              particles[a].x,
              particles[a].y,
              particles[b].x,
              particles[b].y
            );

            gradient.addColorStop(
              0,
              particles[a].color
                .replace(")", `, ${opacity * 0.5})`)
                .replace("rgb", "rgba")
            );
            gradient.addColorStop(
              1,
              particles[b].color
                .replace(")", `, ${opacity * 0.5})`)
                .replace("rgb", "rgba")
            );

            ctx.strokeStyle = gradient;
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    }

    const animate = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      drawBackground();

      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      connectParticles();

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", setCanvasSize);
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseleave", resetMousePosition);
      window.removeEventListener("touchmove", updateTouchPosition);
      window.removeEventListener("touchstart", updateTouchPosition);
      window.removeEventListener("touchend", resetMousePosition);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <BackgroundCanvas ref={canvasRef} />;
};

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
        <FunInteractiveBackground />
        <BackgroundOverlay />
        <LoadingText>Loading contests...</LoadingText>
      </LoadingContainer>
    );
  }

  if (error) {
    return (
      <ErrorContainer>
        <FunInteractiveBackground />
        <BackgroundOverlay />
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
      <FunInteractiveBackground />
      <BackgroundOverlay />
      <ContentContainer>
        <HeaderContainer>
          <Title>Programming Contests</Title>
          <Subtitle>
            Find and track programming contests from all major platforms. Filter
            by platform and get reminders for upcoming contests.
          </Subtitle>
        </HeaderContainer>

        <FilterContainer>
          <FilterTitle>Filter Platforms</FilterTitle>
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
