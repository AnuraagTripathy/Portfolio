/** Local time: light 6:00 through before 19:00 (7 PM), then dark. */
export function getScheduledTheme(now = new Date()): "light" | "dark" {
  const minutes = now.getHours() * 60 + now.getMinutes();
  const start = 6 * 60;
  const end = 19 * 60;
  return minutes >= start && minutes < end ? "light" : "dark";
}
