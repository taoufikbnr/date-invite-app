"use client";

import {  useState } from "react";
import confetti from "canvas-confetti";
import AlternateTimeline from "./components/AlternateTimeline";
import DatePlanner from "./components/DatePlanner";
import SuccessTimeline from "./components/SuccessTimeline";
import Landing from "./components/Landing";


export default function Home() {
  const [accepted, setAccepted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [altScenario, setAltScenario] = useState(false);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");


const launchConfetti = () => {
  confetti({
    particleCount: 150,
    spread: 90,
    origin: { y: 0.6 },
  });

  setTimeout(() => {
    confetti({
      particleCount: 80,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
    });

    confetti({
      particleCount: 80,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
    });
  }, 300);
};
  return (
    <main className="min-h-screen bg-linear-to-br from-pink-200 via-rose-100 to-purple-200 flex items-center justify-center md:p-6 overflow-hidden">
      {!accepted ? (
      <Landing launchConfetti={launchConfetti} setAccepted={setAccepted} />
      ) : submitted ? (
        <DatePlanner date={date} time={time} setDate={setDate} setTime={setTime} setSubmitted={setSubmitted} launchConfetti={launchConfetti} />
      ):!altScenario?(    
      <SuccessTimeline  date={date} time={time} setAltScenario={setAltScenario} />
    ) : (
      <AlternateTimeline/>
      )}
    </main>
  );
}