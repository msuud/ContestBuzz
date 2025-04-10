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
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 0;
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
  padding: 1rem;
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
        <ErrorMessage>{error}</ErrorMessage>
      </ErrorContainer>
    );
  }

  const displayContests =
    contests.ongoing.length > 0 ? contests.ongoing : contests.upcoming;

  if (displayContests.length === 0) {
    return (
      <ErrorContainer>
        <FunInteractiveBackground />
        <BackgroundOverlay />
        <ErrorMessage>No contests available at the moment.</ErrorMessage>
      </ErrorContainer>
    );
  }

  return (
    <PageContainer>
      <FunInteractiveBackground />
      <BackgroundOverlay />
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
