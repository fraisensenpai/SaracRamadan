import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownTimerProps {
  targetDate: Date;
  label: string;
  compact?: boolean;
}

function calcTimeLeft(target: Date): TimeLeft {
  const diff = Math.max(0, target.getTime() - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

const CountdownTimer = ({ targetDate, label, compact }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calcTimeLeft(targetDate));

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calcTimeLeft(targetDate)), 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const units = [
    { value: timeLeft.days, label: "Gün" },
    { value: timeLeft.hours, label: "Saat" },
    { value: timeLeft.minutes, label: "Dakika" },
    { value: timeLeft.seconds, label: "Saniye" },
  ];

  if (compact) {
    return (
      <div className="text-center">
        <p className="text-sm text-muted-foreground mb-2">{label}</p>
        <div className="flex items-center justify-center gap-2">
          {units.map((unit, i) => (
            <span key={unit.label} className="font-amiri text-lg text-primary">
              {String(unit.value).padStart(2, "0")}
              {i < units.length - 1 && <span className="text-muted-foreground ml-2">:</span>}
            </span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="text-center">
      <h3 className="text-sm md:text-base text-muted-foreground mb-4 tracking-wide uppercase">
        {label}
      </h3>
      <div className="flex items-center justify-center gap-3 md:gap-4">
        {units.map((unit) => (
          <motion.div
            key={unit.label}
            className="flex flex-col items-center"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-card-glass rounded-lg w-16 h-16 md:w-20 md:h-20 flex items-center justify-center shadow-gold">
              <span className="font-amiri text-2xl md:text-3xl text-primary font-bold">
                {String(unit.value).padStart(2, "0")}
              </span>
            </div>
            <span className="text-xs text-muted-foreground mt-2">{unit.label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CountdownTimer;
