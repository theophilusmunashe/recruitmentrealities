"use client";

import { useState, useEffect } from "react";

interface CountdownTimerProps {
  targetDate: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const calculateTimeLeft = (): TimeLeft => {
      const difference = +new Date(targetDate) - +new Date();
      
      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      } else {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Calculate initial time
    setTimeLeft(calculateTimeLeft());

    return () => clearInterval(timer);
  }, [targetDate]);

  if (!mounted) {
    // Return a placeholder during SSR to avoid hydration mismatch
    return (
      <div className="flex justify-center items-center space-x-4 sm:space-x-6">
        <div className="text-center">
          <div className="bg-white rounded-xl p-3 shadow-lg border border-orange-200 dark:border-slate-600 w-16 h-16 flex items-center justify-center">
            <div className="text-2xl font-bold text-black animate-pulse">--</div>
          </div>
          <div className="text-xs sm:text-sm text-slate-10 dark:text-slate-11 mt-2 font-medium">Days</div>
        </div>
        <div className="text-center">
          <div className="bg-white rounded-xl p-3 shadow-lg border border-orange-200 dark:border-slate-600 w-16 h-16 flex items-center justify-center">
            <div className="text-2xl font-bold text-black animate-pulse">--</div>
          </div>
          <div className="text-xs sm:text-sm text-slate-10 dark:text-slate-11 mt-2 font-medium">Hours</div>
        </div>
        <div className="text-center">
          <div className="bg-white rounded-xl p-3 shadow-lg border border-orange-200 dark:border-slate-600 w-16 h-16 flex items-center justify-center">
            <div className="text-2xl font-bold text-black animate-pulse">--</div>
          </div>
          <div className="text-xs sm:text-sm text-slate-10 dark:text-slate-11 mt-2 font-medium">Minutes</div>
        </div>
        <div className="text-center">
          <div className="bg-white rounded-xl p-3 shadow-lg border border-orange-200 dark:border-slate-600 w-16 h-16 flex items-center justify-center">
            <div className="text-2xl font-bold text-black animate-pulse">--</div>
          </div>
          <div className="text-xs sm:text-sm text-slate-10 dark:text-slate-11 mt-2 font-medium">Seconds</div>
        </div>
      </div>
    );
  }

  const timeUnits = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <div className="flex justify-center items-center space-x-4 sm:space-x-6">
      {timeUnits.map((unit, index) => (
        <div key={unit.label} className="text-center">
          <div className="bg-white rounded-xl p-3 shadow-lg border border-orange-200 dark:border-slate-600">
            <div className="text-2xl sm:text-3xl font-bold text-black min-w-[3rem] tabular-nums">
              {unit.value.toString().padStart(2, '0')}
            </div>
          </div>
          <div className="text-xs sm:text-sm text-slate-10 dark:text-slate-11 mt-2 font-medium">
            {unit.label}
          </div>

        </div>
      ))}
    </div>
  );
}