export const formatDate = (dateString) => {
  if (!dateString) return "";

  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const formatTime = (dateString) => {
  if (!dateString) return "";

  const date = new Date(dateString);
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

export const formatDateTime = (dateString) => {
  if (!dateString) return "";

  const date = new Date(dateString);
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

export const calculateDuration = (startDateString, endDateString) => {
  if (!startDateString || !endDateString) return "";

  const startDate = new Date(startDateString);
  const endDate = new Date(endDateString);

  const durationMs = endDate - startDate;
  const hours = Math.floor(durationMs / (1000 * 60 * 60));
  const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));

  if (hours === 0) {
    return `${minutes} min${minutes !== 1 ? "s" : ""}`;
  }

  if (minutes === 0) {
    return `${hours} hr${hours !== 1 ? "s" : ""}`;
  }

  return `${hours} hr${hours !== 1 ? "s" : ""} ${minutes} min${
    minutes !== 1 ? "s" : ""
  }`;
};

export const isContestOngoing = (startDateString, endDateString) => {
  const now = new Date();
  const startDate = new Date(startDateString);
  const endDate = new Date(endDateString);

  return startDate <= now && endDate >= now;
};

export const isContestUpcoming = (startDateString) => {
  const now = new Date();
  const startDate = new Date(startDateString);

  return startDate > now;
};

export const getTimeUntilStart = (startDateString) => {
  const now = new Date();
  const startDate = new Date(startDateString);

  if (startDate <= now) {
    return "Started";
  }

  const diffMs = startDate - now;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor(
    (diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

  if (diffDays > 0) {
    return `${diffDays} day${diffDays !== 1 ? "s" : ""} ${diffHours} hr${
      diffHours !== 1 ? "s" : ""
    }`;
  }

  if (diffHours > 0) {
    return `${diffHours} hr${diffHours !== 1 ? "s" : ""} ${diffMinutes} min${
      diffMinutes !== 1 ? "s" : ""
    }`;
  }

  return `${diffMinutes} min${diffMinutes !== 1 ? "s" : ""}`;
};

export const createCalendarEvent = async (contest) => {
  const { name, start_time, end_time, platform, url } = contest;

  const startDate = new Date(start_time);
  const endDate = new Date(end_time);

  const formatCalendarDate = (date) => {
    return date.toISOString().replace(/-|:|\.\d+/g, "");
  };

  const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    name
  )}&dates=${formatCalendarDate(startDate)}/${formatCalendarDate(
    endDate
  )}&details=${encodeURIComponent(
    `Platform: ${platform}\nURL: ${url}`
  )}&location=${encodeURIComponent(url)}`;

  window.open(calendarUrl, "_blank");

  return true;
};

export default {
  formatDate,
  formatTime,
  formatDateTime,
  calculateDuration,
  isContestOngoing,
  isContestUpcoming,
  getTimeUntilStart,
  createCalendarEvent,
};
