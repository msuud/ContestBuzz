import React, { useState, useEffect, useRef } from "react";
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

const BackgroundCanvas = styled.canvas`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
`;

const PageContainer = styled.div`
  position: relative;
  min-height: 100vh;
  width: 100%;
  color: white;
  overflow: hidden;
  margin: 0;
  padding: 0;
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 3rem;
  background: linear-gradient(to right, #4ade80, #3b82f6, #a855f7, #ec4899);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin-bottom: 1rem;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  color:white;
  max-width: 700px;
  margin: 0 auto;
  border-bottom: 2px solid #8b5cf6;
  padding-bottom: 1.5rem;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1.5rem;
  position: relative;
  padding-bottom: 0.5rem;
  background: linear-gradient(to right, #3b82f6, #8b5cf6);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;

  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 50px;
    height: 3px;
    background: linear-gradient(to right, #3b82f6, #8b5cf6);
    transition: width 0.3s ease;
  }

  &:hover:after {
    width: 100px;
  }
`;

const AboutSection = styled.div`
  margin-bottom: 4rem;
`;

const AboutText = styled.p`
  font-size: 1.1rem;
  line-height: 1.7;
  color: white;
  margin-bottom: 1.5rem;
  transition: color 0.3s ease;

  &:hover {
    color: #a5b4fc;
  }
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const FeatureCard = styled.div`
  background: rgba(30, 41, 59, 0.3);
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid transparent;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.2);
    border: 1px solid ${(props) => props.borderColor || "#8b5cf6"};
  }
`;

const FeatureTitle = styled.h3`
  font-size: 1.25rem;
  color: ${(props) => props.color || "#f3f4f6"};
  margin-bottom: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const FeatureDescription = styled.p`
  color: white;
  line-height: 1.6;
  transition: color 0.3s ease;

  &:hover {
    color: #e2e8f0;
  }
`;

const CTAButton = styled.button`
  background: linear-gradient(to right, #8b5cf6, #ec4899);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 2rem auto;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(139, 92, 246, 0.5);
  }
`;

const AnimatedHeart = styled(FaHeart)`
  color: #ec4899;
  animation: pulse 1.5s infinite;

  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  }
`;

const FooterText = styled.p`
  text-align: center;
  color:white;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
  margin-bottom: 0;
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

const AboutPage = () => {
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const navigate = useNavigate();

  const featureColors = {
    0: { color: "#4ade80", border: "rgba(74, 222, 128, 0.3)" },
    1: { color: "#3b82f6", border: "rgba(59, 130, 246, 0.3)" },
    2: { color: "#a855f7", border: "rgba(168, 85, 247, 0.3)" },
    3: { color: "#ec4899", border: "rgba(236, 72, 153, 0.3)" },
  };

  return (
    <PageContainer>
      <FunInteractiveBackground />
      <ContentContainer>
        <Header>
          <Title>About ContestBuzz</Title>
          <Subtitle>
            Your one-stop solution for tracking competitive programming contests
            across all major platforms.
          </Subtitle>
        </Header>

        <AboutSection>
          <SectionTitle>Our Mission</SectionTitle>
          <AboutText>
            ContestBuzz was created with a simple mission: to help competitive
            programmers never miss another programming contest. We understand
            the frustration of discovering a contest too late or forgetting
            about an important competition.
          </AboutText>
          <AboutText>
            Our platform aggregates contests from all major competitive
            programming websites, providing you with a unified interface to
            track, filter, and get notifications for upcoming contests. Whether
            you're a beginner or a seasoned competitive programmer, ContestBuzz
            helps you stay on top of your game.
          </AboutText>

          <SectionTitle>Key Features</SectionTitle>
          <FeatureGrid>
            {[
              {
                title: "All Platforms in One Place",
                description:
                  "Track contests from LeetCode, CodeForces, CodeChef, and other platforms in a single dashboard.",
                icon: <FaGithub />,
              },
              {
                title: "Email Notifications",
                description:
                  "Set up notifications to receive reminder 1 hour before your favorite contests start.",
                icon: <FaEnvelope />,
              },
              {
                title: "Calendar Integration",
                description:
                  "Add contest schedules directly to your calendar with a single click to better plan your participation.",
                icon: <FaTwitter />,
              },
              {
                title: "Contest Filtering",
                description:
                  "Filter contests by platform to find exactly what you're looking for, saving time and focusing on what matters to you.",
                icon: <FaLinkedin />,
              },
            ].map((feature, index) => (
              <FeatureCard
                key={index}
                onMouseEnter={() => setHoveredFeature(index)}
                onMouseLeave={() => setHoveredFeature(null)}
                borderColor={
                  hoveredFeature === index
                    ? featureColors[index].border
                    : "transparent"
                }
              >
                <FeatureTitle color={featureColors[index].color}>
                  {feature.icon} {feature.title}
                </FeatureTitle>
                <FeatureDescription>{feature.description}</FeatureDescription>
              </FeatureCard>
            ))}
          </FeatureGrid>

          <CTAButton onClick={() => navigate("/contests")}>
            Explore Contests <FaArrowRight />
          </CTAButton>

          <FooterText>
            Made with <AnimatedHeart /> for the Competitive Programming
            Community
          </FooterText>
        </AboutSection>
      </ContentContainer>
    </PageContainer>
  );
};

export default AboutPage;
