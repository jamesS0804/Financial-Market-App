export default function convertToProperDateAndTime(dateString) {
    const date = new Date(dateString);
  
    const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
    const dateOptions = { year: 'numeric', month: 'numeric', day: 'numeric' };
  
    const formattedTime = date.toLocaleTimeString('en-US', timeOptions);
    const formattedDate = date.toLocaleDateString('en-US', dateOptions);
  
    // Get the UTC offset in minutes and convert it to hours
    const timeZoneOffsetMinutes = date.getTimezoneOffset();
    const timeZoneOffsetHours = -Math.floor(timeZoneOffsetMinutes / 60);
  
    // Construct the time zone string with "GMT" and the offset
    const timeZone = `GMT+${timeZoneOffsetHours}`;
  
    return `${formattedDate} ${formattedTime} ${timeZone}`;
  }
  