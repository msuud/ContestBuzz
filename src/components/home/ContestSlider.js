import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import FeaturedContest from "./FeaturedContest";

const SliderContainer = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
`;

const SlideWrapper = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem 0;
`;

const SlideBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(1, 8, 26, 0);
  z-index: -1;
`;

const SlideContent = styled.div`
  width: 80%;
  max-width: 800px;
  margin: 0 auto;
  z-index: 5;
  position: relative;
  height: 450px; // Fixed height for all slides
`;

const Dots = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 2rem;
  left: 0;
  right: 0;
  z-index: 10;
`;

const Dot = styled.button`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${(props) =>
    props.$active ? "var(--primary, #8b5cf6)" : "rgba(255, 255, 255, 0.2)"};
  margin: 0 5px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  transform: ${(props) => (props.$active ? "scale(1.2)" : "scale(1)")};

  &:hover {
    background-color: ${(props) =>
      props.$active ? "var(--primary, #8b5cf6)" : "rgba(255, 255, 255, 0.4)"};
  }
`;

const NavigationButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  background-color: rgba(15, 23, 42, 0.6);
  color: white;
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: var(--primary, #8b5cf6);
    transform: translateY(-50%) scale(1.1);
  }

  &.prev {
    left: 20px;
  }

  &.next {
    right: 20px;
  }
`;

const ContestSlider = ({ contests = [] }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const [loadedImages, setLoadedImages] = useState({});

  useEffect(() => {
    if (contests.length > 0) {
      contests.forEach((contest) => {
        if (contest && contest.platform) {
          const img = new Image();
          img.onload = () => {
            setLoadedImages((prev) => ({
              ...prev,
              [contest.platform]: true,
            }));
          };
        }
      });
    }
  }, [contests]);

  useEffect(() => {
    if (contests.length <= 1) return;

    const timer = setTimeout(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % contests.length);
    }, 8000);

    return () => clearTimeout(timer);
  }, [currentSlide, contests.length]);

  const handlePrev = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev === 0 ? contests.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % contests.length);
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
    }),
  };

  if (contests.length === 0) return null;

  const currentContest = contests[currentSlide];

  return (
    <SliderContainer>
      <SlideBackground />

      <SlideWrapper>
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              type: "tween",
              ease: "easeInOut",
              duration: 0.5,
            }}
            style={{
              width: "100%",
              position: "absolute",
              left: 0,
              right: 0,
            }}
          >
            <SlideContent>
              <FeaturedContest contest={currentContest} />
            </SlideContent>
          </motion.div>
        </AnimatePresence>

        {contests.length > 1 && (
          <>
            <NavigationButton className="prev" onClick={handlePrev}>
              <FaChevronLeft />
            </NavigationButton>
            <NavigationButton className="next" onClick={handleNext}>
              <FaChevronRight />
            </NavigationButton>
          </>
        )}
      </SlideWrapper>

      {contests.length > 1 && (
        <Dots>
          {contests.map((_, index) => (
            <Dot
              key={index}
              $active={index === currentSlide}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </Dots>
      )}
    </SliderContainer>
  );
};

export default ContestSlider;
