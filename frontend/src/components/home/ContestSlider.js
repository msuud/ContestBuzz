import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import FeaturedContest from "./FeaturedContest";

/* MAIN CONTAINER */
const SliderContainer = styled.div`
  position: relative;
  width: 100%;
  min-height: 600px; /* Remove full screen dark area */
  background: #ffffff; /* WHITE BACKGROUND */
  overflow: hidden;
  padding: 2rem 0;
`;

/* CENTER WRAPPER */
const SlideWrapper = styled.div`
  position: relative;
  width: 100%;
  min-height: 500px;
  background: #ffffff; /* White */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SlideContent = styled.div`
  width: 90%;
  max-width: 900px;
  margin: 0 auto;
  z-index: 5;
  position: relative;
  height: 450px;
`;

/* DOTS */
const Dots = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`;

const Dot = styled.button`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${(props) =>
    props.$active ? "#2f692d" : "rgba(0, 0, 0, 0.2)"};
  margin: 0 5px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${(props) =>
      props.$active ? "#2f692d" : "rgba(0,0,0,0.4)"};
  }
`;

/* NAVIGATION BUTTONS – LIGHT & CLEAN */
const NavigationButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: #ffffff;
  border: 2px solid #2f692d;
  color: #2f692d;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10;
  box-shadow: 0 4px 12px rgba(0, 80, 0, 0.15);

  &:hover {
    background-color: #2f692d;
    color: white;
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
    center: { x: 0, opacity: 1 },
    exit: (direction) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
    }),
  };

  if (contests.length === 0) return null;

  const currentContest = contests[currentSlide];

  return (
    <SliderContainer>
      <SlideWrapper>
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "tween", ease: "easeInOut", duration: 0.5 }}
            style={{ width: "100%", position: "absolute" }}
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
