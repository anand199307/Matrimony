export const getWhatsAppLikeTime = (timestamp: string) => {
  const now = new Date();
  const messageTime = new Date(timestamp);

  const timeDiff = now.getTime() - messageTime.getTime(); // Get timestamps as numbers
  const secondsAgo = Math.floor(timeDiff / 1000);
  const minutesAgo = Math.floor(secondsAgo / 60);
  const hoursAgo = Math.floor(minutesAgo / 60);

  if (hoursAgo < 12 && now.getDate() === messageTime.getDate()) {
    // Display time in 12-hour format if sent within the last 12 hours
    return messageTime.toLocaleString('en-IN', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
  } else if (
    now.getDate() === messageTime.getDate() &&
    now.getMonth() === messageTime.getMonth() &&
    now.getFullYear() === messageTime.getFullYear()
  ) {
    // Display time in 24-hour format if sent on the same day but more than 12 hours ago
    return messageTime.toLocaleString('en-IN', {
      hour: 'numeric',
      minute: 'numeric',
    });
  } else if (
    now.getDate() - 1 === messageTime.getDate() &&
    now.getMonth() === messageTime.getMonth() &&
    now.getFullYear() === messageTime.getFullYear()
  ) {
    // Display "Yesterday" for messages received yesterday
    return 'Yesterday';
  } else {
    // Display date and time for messages received on previous days
    const formattedDate = messageTime.toLocaleString('en-IN', {
      month: 'short',
      day: 'numeric',
    });
    return `${formattedDate}, ${messageTime.toLocaleString('en-IN', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    })}`;
  }
};
