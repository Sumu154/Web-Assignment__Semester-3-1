export const timeLeftFormat = (time) => {
  //console.log(time);
  const days = Math.floor(time / (60 * 60 * 24));  // 60 seconds * 60 minutes * 24 hours
  const hours = Math.floor((time % (60 * 60 * 24)) / (60 * 60));  // remaining hours
  const minutes = Math.floor((time % (60 * 60)) / 60);  // remaining minutes
  const seconds = Math.floor(time % 60);  // remaining seconds

  // Return formatted string with leading zeroes if needed
  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
};