export function displayLocalTime({
  utcDateTime,
  dateOnly = false,
}: {
  utcDateTime: string;
  dateOnly?: boolean;
}) {
  const date = new Date(utcDateTime);
  if (dateOnly) {
    return date.toLocaleDateString();
  }
  return date.toLocaleString();
}
