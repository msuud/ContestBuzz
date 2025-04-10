import React, { useState, useEffect } from "react";
import styled from "styled-components";
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
import { getPlatformIcon } from "../../utils/platformIcon";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import {
  scheduleNotification,
  cancelNotification,
} from "../../services/notificationService";

const GradientBorderWrapper = styled.div`
  padding: 0.6px;
  border-radius: 16px;
  background: linear-gradient(135deg, #ff00cc, #3333ff, #00ffcc);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
`;

const CardContainer = styled.div`
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  width: 100%;
  height: 100%;
  color: white;
  background-color: #111827;
  background-image: ${(props) =>
    `url(/assets/${props.platform.toLowerCase()}.png)`};
  background-size: cover;
  background-position: center;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: rgba(7, 0, 0, 0); /* Light overlay */
    z-index: 0;
  }

  > * {
    position: relative;
    z-index: 1;
  }
`;

const CardHeader = styled.div`
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  border-radius: 8px;
`;

const PlatformLogo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
`;

const PlatformName = styled.span`
  font-size: 1.5rem;
  color: rgb(255, 255, 255);
  font-weight: 500;
  text-transform: capitalize;
`;

const CardContent = styled.div`
  padding: 1rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const ContestName = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: white;
  margin-bottom: 1rem;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1rem;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #f59e0b;
  font-size: 0.8rem;
  font-weight: 500;
  padding: 0.3rem 0.6rem;
  background-color: rgb(255, 254, 254, 0.2);
  border-radius: 9999px;
  width: fit-content;

  svg {
    color: #f59e0b;
    font-size: 0.8rem;
  }
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  font-size: 0.7rem;
  font-weight: 600;
  margin-bottom: 0.8rem;
  width: fit-content;

  &.ongoing {
    background-color: rgba(16, 185, 129, 0.2);
    border: 1px solid rgba(16, 185, 129, 0.5);
    color: #10b981;
  }

  &.upcoming {
    background-color: rgba(139, 92, 246, 0.2);
    border: 1px solid rgba(139, 92, 246, 0.5);
    color: #8b5cf6;
  }

  &.past {
    background-color: rgba(107, 114, 128, 0.2);
    border: 1px solid rgba(107, 114, 128, 0.5);
    color: #6b7280;
  }
`;

const CardFooter = styled.div`
  display: flex;
  gap: 0.5rem;
  padding: 0.8rem;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
  padding: 0.5rem;
  border-radius: 8px;
  font-weight: 700;
  font-size: 0.75rem;
  transition: all 0.2s ease;
  background-color: rgba(255, 255, 255, 0.9);
  color: black;
  border: 1px solid rgb(0, 2, 6);
  flex: 1;

  &:hover {
    background-color: rgba(75, 85, 99, 0.5);
    transform: translateY(-1px);
  }

  &.subscribed {
    background-color: rgb(0, 66, 44);
    border: 1px solid rgba(16, 185, 129, 1);
    color: #10b981;

    &:hover {
      background-color: rgb(0, 38, 25);
    }
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ContestCard = ({ contest, status }) => {
  const { currentUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isNotified, setIsNotified] = useState(false);

  useEffect(() => {
    if (currentUser) {
      const notifiedContests = JSON.parse(
        localStorage.getItem("notifiedContests") || "{}"
      );
      setIsNotified(!!notifiedContests[`${currentUser.uid}_${contest.id}`]);
    }
  }, [contest.id, currentUser]);

  const handleCalendarEvent = () => {
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

  const renderStatusBadge = () => {
    if (status === "ongoing")
      return <StatusBadge className="ongoing">LIVE NOW</StatusBadge>;
    if (status === "upcoming")
      return <StatusBadge className="upcoming">UPCOMING</StatusBadge>;
    if (status === "past")
      return <StatusBadge className="past">COMPLETED</StatusBadge>;
    return null;
  };

  const duration = calculateDuration(
    new Date(contest.start_time),
    new Date(contest.end_time)
  );
  const startDateTime = formatDateTime(new Date(contest.start_time));
  const timeUntil =
    status === "upcoming" ? getTimeUntilStart(contest.start_time) : null;

  return (
    <GradientBorderWrapper>
      <CardContainer platform={contest.platform}>
        <CardHeader>
          <PlatformLogo>{getPlatformIcon(contest.platform, 24)}</PlatformLogo>
          <PlatformName>{contest.platform}</PlatformName>
        </CardHeader>

        <CardContent>
          {renderStatusBadge()}
          <ContestName>{contest.name}</ContestName>

          <InfoContainer>
            <InfoItem>
              <FaCalendarAlt />
              <span>{startDateTime}</span>
            </InfoItem>
            <InfoItem>
              <FaClock />
              <span>{duration}</span>
            </InfoItem>
            {status === "upcoming" && timeUntil && (
              <InfoItem>
                <FaClock />
                <span>Starts in: {timeUntil}</span>
              </InfoItem>
            )}
          </InfoContainer>
        </CardContent>

        <CardFooter>
          <Button onClick={() => window.open(contest.url, "_blank")}>
            <FaExternalLinkAlt size={12} /> Visit
          </Button>

          {status === "upcoming" && (
            <>
              <Button onClick={handleCalendarEvent} title="Add to Calendar">
                <FaCalendarAlt size={12} />
              </Button>
              <Button
                className={isNotified ? "subscribed" : ""}
                onClick={handleNotificationToggle}
                disabled={isLoading}
                title={isNotified ? "Cancel notification" : "Set notification"}
              >
                <FaBell size={12} /> {isNotified ? "Notified" : "Notify Me"}
              </Button>
            </>
          )}
        </CardFooter>
      </CardContainer>
    </GradientBorderWrapper>
  );
};

export default ContestCard;
