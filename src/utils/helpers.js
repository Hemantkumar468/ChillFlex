export const formatRuntime = (minutes) => {
  if (!minutes) return null;
  return `${Math.floor(minutes / 60)}h ${minutes % 60}m`;
};

export const getYear = (dateString) => dateString?.split("-")[0];

export const truncateText = (text, maxLength = 150) => {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
};
