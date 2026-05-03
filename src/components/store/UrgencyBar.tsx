import { useEffect, useState } from "react";
import { Flame } from "lucide-react";

const KEY = "urgency_ends_at";
const DURATION = 15 * 60 * 1000;

const getEnd = () => {
  const stored = Number(localStorage.getItem(KEY));
  if (stored && stored > Date.now()) return stored;
  const next = Date.now() + DURATION;
  localStorage.setItem(KEY, String(next));
  return next;
};

export const UrgencyBar = () => {
  const [left, setLeft] = useState(DURATION);

  useEffect(() => {
    const end = getEnd();
    const tick = () => {
      const diff = end - Date.now();
      if (diff <= 0) {
        localStorage.removeItem(KEY);
        setLeft(DURATION);
      } else setLeft(diff);
    };
    tick();
    const i = setInterval(tick, 1000);
    return () => clearInterval(i);
  }, []);

  const m = Math.floor(left / 60000);
  const s = Math.floor((left % 60000) / 1000);
  const fmt = `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;

  return (
    <div className="bg-gradient-to-r from-[hsl(0_84%_42%)] via-[hsl(0_84%_50%)] to-[hsl(0_84%_42%)] text-white animate-pulse">
      <div className="container flex items-center justify-center gap-2 py-1.5 text-[11px] sm:text-sm font-bold">
        <Flame className="h-4 w-4" />
        <span>OFERTA RELÂMPAGO termina em</span>
        <span className="font-mono bg-white text-[hsl(0_84%_42%)] px-2 py-0.5 rounded tabular-nums">{fmt}</span>
        <a href="#produtos" className="hidden sm:inline underline underline-offset-2">Garantir agora</a>
      </div>
    </div>
  );
};