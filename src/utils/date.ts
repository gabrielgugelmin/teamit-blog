function padTo2Digits(number: number): string {
  return number.toString().padStart(2, "0");
}

export function formatDate(date?: string): string {
  if (!date) return "";
  let d = new Date(date);
  return [
    padTo2Digits(d.getDate()),
    padTo2Digits(d.getMonth() + 1),
    d.getFullYear(),
  ].join("/");
}
