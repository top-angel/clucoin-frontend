import useInterval from "./useInterval";
import { useCallback, useMemo, useState } from "react";

export const useCountdown = (
  date: Date,
  callback?: () => void
): null | { days: number; hours: number; mins: number; seconds: number } => {
  const [remaining, setRemaining] = useState<number | null>();

  const updateTime = useCallback(() => {
    let now = new Date();
    now = new Date(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate(),
      now.getUTCHours(),
      now.getUTCMinutes(),
      now.getUTCSeconds()
    );

    const remaining = date.getTime() - now.getTime();

    if (remaining == 0) {
      callback && callback();
    }

    setRemaining(remaining >= 0 ? remaining : null);
  }, [date, callback]);

  useInterval(updateTime, 1000);

  return useMemo(() => {
    if (!remaining) return null;

    const daysLeft = Math.floor(remaining / (1000 * 60 * 60 * 24));
    const hoursLeft = Math.floor(
      (remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutesLeft = Math.floor(
      (remaining % (1000 * 60 * 60)) / (1000 * 60)
    );
    const secondsLeft = Math.floor((remaining % (1000 * 60)) / 1000);

    return {
      days: daysLeft,
      hours: hoursLeft,
      mins: minutesLeft,
      seconds: secondsLeft,
    };
  }, [remaining]);
};
