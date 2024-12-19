export function displayLocalTime({
  utcDateTime,
  dateOnly = false,
}: {
  utcDateTime: string;
  dateOnly?: boolean;
}) {
  var date = new Date(utcDateTime).toLocaleString();
  date = dateOnly
    ? date
        .split(".")
        .slice(0, 3)
        .map((part) => part.trim())
        .join("/")
    : date;
  return date.toLocaleString();
}
