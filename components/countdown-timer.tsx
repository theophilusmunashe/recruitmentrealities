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
      <div className="flex justify-center items-center space-x-2 sm:space-x-4 md:space-x-6">
        <div className="text-center">
          <div className="bg-white rounded-xl p-2 sm:p-3 shadow-md sm:shadow-lg border border-orange-200 dark:border-slate-600 w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center">
            <div className="text-lg sm:text-2xl font-bold text-black animate-pulse">--</div>
          </div>
          <div className="text-xs text-slate-10 dark:text-slate-11 mt-1 sm:mt-2 font-medium">Days</div>
        </div>
        <div className="text-center">
          <div className="bg-white rounded-xl p-2 sm:p-3 shadow-md sm:shadow-lg border border-orange-200 dark:border-slate-600 w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center">
            <div className="text-lg sm:text-2xl font-bold text-black animate-pulse">--</div>
          </div>
          <div className="text-xs text-slate-10 dark:text-slate-11 mt-1 sm:mt-2 font-medium">Hours</div>
        </div>
        <div className="text-center">
          <div className="bg-white rounded-xl p-2 sm:p-3 shadow-md sm:shadow-lg border border-orange-200 dark:border-slate-600 w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center">
            <div className="text-lg sm:text-2xl font-bold text-black animate-pulse">--</div>
          </div>
          <div className="text-xs text-slate-10 dark:text-slate-11 mt-1 sm:mt-2 font-medium">Min</div>
        </div>
        <div className="text-center">
          <div className="bg-white rounded-xl p-2 sm:p-3 shadow-md sm:shadow-lg border border-orange-200 dark:border-slate-600 w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center">
            <div className="text-lg sm:text-2xl font-bold text-black animate-pulse">--</div>
          </div>
          <div className="text-xs text-slate-10 dark:text-slate-11 mt-1 sm:mt-2 font-medium">Sec</div>
        </div>
      </div>
    );
  }

  const timeUnits = [
    { label: "Days", shortLabel: "Days", value: timeLeft.days },
    { label: "Hours", shortLabel: "Hrs", value: timeLeft.hours },
    { label: "Minutes", shortLabel: "Min", value: timeLeft.minutes },
    { label: "Seconds", shortLabel: "Sec", value: timeLeft.seconds },
  ];

  return (
    <div className="flex justify-center items-center space-x-2 sm:space-x-4 md:space-x-6">
      {timeUnits.map((unit, index) => (
        <div key={unit.label} className="text-center">
          <div className="bg-white rounded-xl p-2 sm:p-3 shadow-md sm:shadow-lg border border-orange-200 dark:border-slate-600 w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center">
            <div className="text-lg sm:text-2xl font-bold text-black tabular-nums">
              {unit.value.toString().padStart(2, '0')}
            </div>
          </div>
          <div className="text-xs text-slate-10 dark:text-slate-11 mt-1 sm:mt-2 font-medium">
            <span className="hidden sm:inline">{unit.label}</span>
            <span className="inline sm:hidden">{unit.shortLabel}</span>
          </div>
        </div>
      ))}
    </div>
  );
}