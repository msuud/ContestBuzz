import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  FaClock,
  FaCalendarAlt,
  FaExternalLinkAlt,
  FaBell,
} from "react-icons/fa";
import {
  calculateDuration,
  formatDateTime,
  getTimeUntilStart,
  createCalendarEvent,
} from "../../utils/dateUtils";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import {
  scheduleNotification,
  cancelNotification,
} from "../../services/notificationService";

const Container = styled(motion.div)`
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  width: 100%;
  height: 100%;
  color: white;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
  background-color: #053716ff;
  background-image: ${(props) =>
    props.backgroundImage
      ? `linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0)), url(${props.backgroundImage})`
      : "none"};
  background-size: 200px;
  background-repeat: no-repeat;
  background-position: right 20px top 175px;
  padding: 2rem;
  margin: 0 auto;
  max-width: 700px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ContestName = styled.h2`
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 1rem;
  color: white;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.7);
  line-height: 1.2;
  max-width: 100%;
`;

const CountdownTimer = styled.div`
  font-weight: 700;
  font-size: 1rem;
  color: rgb(210, 119, 29);
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  padding: 0.4rem 0.8rem;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 9999px;
  display: inline-flex;
  align-items: center;
  margin-bottom: 1rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
  width: fit-content;

  svg {
    margin-right: 0.5rem;
    color: rgb(210, 119, 29);
  }
`;

const ContestInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-top: 5rem;
`;

const InfoItem = styled.div`
  font-weight: 700;
  font-size: 1rem;
  color: rgb(210, 119, 29);
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  padding: 0.4rem 0.8rem;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 9999px;
  display: inline-flex;
  align-items: center;
  margin-bottom: 1rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
  width: fit-content;

  svg {
    margin-right: 0.5rem;
    color: rgb(210, 119, 29);
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  flex-wrap: wrap;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.7rem 1.4rem;
  border-radius: 9999px;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.3s ease;
  transform: translateY(0);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color: rgba(75, 85, 99, 0.3);
  color: white;
  border: 1px solid rgba(156, 163, 175, 0.5);
  backdrop-filter: blur(5px);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
    background-color: rgba(75, 85, 99, 0.5);
  }

  &.subscribed {
    background-color: rgba(16, 185, 129, 0.3);
    border: 1px solid rgba(16, 185, 129, 0.5);

    &:hover {
      background-color: rgba(16, 185, 129, 0.5);
    }
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: translateY(0);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`;

const FeaturedContest = ({ contest }) => {
  const { currentUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isNotified, setIsNotified] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (currentUser && contest) {
      const notifiedContests = JSON.parse(
        localStorage.getItem("notifiedContests") || "{}"
      );
      setIsNotified(!!notifiedContests[`${currentUser.uid}_${contest.id}`]);
    }

    if (contest && contest.platform) {
      const img = new Image();
      img.src = `/assets/${contest.platform.toLowerCase()}.png`;
      img.onload = () => setImageLoaded(true);
      img.onerror = () => setImageLoaded(false);
    }
  }, [contest, currentUser]);

  if (!contest) return null;

  const { name, platform, start_time, end_time, url, id } = contest;

  const duration = calculateDuration(new Date(start_time), new Date(end_time));
  const startDateTime = formatDateTime(new Date(start_time));
  const timeUntil = getTimeUntilStart(start_time);

  const isUpcoming = new Date(start_time) > new Date();

  const handleAddToCalendar = () => {
    createCalendarEvent(contest);
  };

  const handleNotificationToggle = async () => {
    if (!currentUser) {
      toast.error("Please sign in to set notifications");
      return;
    }

    setIsLoading(true);

    try {
      if (isNotified) {
        const success = await cancelNotification(currentUser.uid, contest.id);
        if (success) {
          const notifiedContests = JSON.parse(
            localStorage.getItem("notifiedContests") || "{}"
          );
          delete notifiedContests[`${currentUser.uid}_${contest.id}`];
          localStorage.setItem(
            "notifiedContests",
            JSON.stringify(notifiedContests)
          );
          setIsNotified(false);
          toast.success("Notification canceled");
        }
      } else {
        const success = await scheduleNotification(
          currentUser.uid,
          currentUser.email,
          contest
        );
        if (success) {
          const notifiedContests = JSON.parse(
            localStorage.getItem("notifiedContests") || "{}"
          );
          notifiedContests[`${currentUser.uid}_${contest.id}`] = true;
          localStorage.setItem(
            "notifiedContests",
            JSON.stringify(notifiedContests)
          );
          setIsNotified(true);
          toast.success("Notification set successfully");
        }
      }
    } catch (error) {
      console.error("Error toggling notification:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      backgroundImage={`/assets/${platform.toLowerCase()}.png`}
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <ContestName>{name}</ContestName>
      </motion.div>

      {isUpcoming && timeUntil && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <CountdownTimer>
            <FaClock />
            <span>Starts in: {timeUntil}</span>
          </CountdownTimer>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <ActionButtons>
          <ActionButton onClick={() => window.open(url, "_blank")}>
            <FaExternalLinkAlt /> Visit Contest
          </ActionButton>
        </ActionButtons>
        <div>
          <ContestInfo>
            <InfoItem>
              <FaCalendarAlt />
              <span>{startDateTime}</span>
            </InfoItem>
            <InfoItem>
              <FaClock />
              <span>{duration}</span>
            </InfoItem>
          </ContestInfo>
        </div>
      </motion.div>
    </Container>
  );
};

export default FeaturedContest;
