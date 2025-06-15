export const formatTime = (ms: number): string => {
  const hrs = Math.floor(ms / 3600000);
  const mins = Math.floor((ms % 3600000) / 60000);
  const secs = Math.floor((ms % 60000) / 1000);
  const millis = Math.floor((ms % 1000) / 100);

  const pad = (n: number, len = 2) => String(n).padStart(len, "0");

  return `${pad(hrs)}:${pad(mins)}:${pad(secs)}.${millis}`;
};
