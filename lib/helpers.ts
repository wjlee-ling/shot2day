export function displayLocalTime({
  utcDateTime,
  dateOnly = false,
}: {
  utcDateTime: string;
  dateOnly?: boolean;
}) {
  var date = new Date(utcDateTime);
  if (dateOnly) {
    return date.toLocaleDateString();
  }
  return date.toLocaleString();
}
