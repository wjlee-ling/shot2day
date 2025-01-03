export function displayLocalTime({
  utcDateTime,
  dateOnly = false,
}: {
  utcDateTime: string;
  dateOnly?: boolean;
}) {
  // Replace colons in the date portion with dashes
  const formattedDateTime = utcDateTime.replace(/^(\d{4}):(\d{2}):(\d{2})/, "$1-$2-$3");
  const date = new Date(formattedDateTime);
  console.log(formattedDateTime);

  if (isNaN(date.getTime())) {
    return "Invalid Date"; // Fallback for debugging
  }

  if (dateOnly) {
    return date.toLocaleDateString();
  }
  return date.toLocaleString();
}
