import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const AlternateTimeline = () => {
const ranOnce = useRef(false);
const [logsList, setLogsList] = useState<string[]>([]);
const [progress, setProgress] = useState(0);
const [shuttingDown, setShuttingDown] = useState(false);
const [secondsLeft, setSecondsLeft] = useState(20);


const startShutdown = () => {
  setShuttingDown(true);
  setProgress(0);

  const duration = 5000; 
  const intervalTime = 100;

  const steps = duration / intervalTime;
  let current = 0;

  const interval = setInterval(() => {
    current++;
    setProgress(Math.min((current / steps) * 100, 100));

    if (current >= steps) {
      clearInterval(interval);
    }
  }, intervalTime);
};
useEffect(() => {
    const logs = [
  "🧠 SYSTEM: user not available (probably overthinking again)",
  "💔 HEART.EXE: crashed due to emotional overload",
  "🔍 SEARCHING: looking for better signal…?",
  "💘 CUPID: ‘I swear I had aim assist on’",
  "🤖 CHAOS ENGINE: now running relationship decisions",
  "🚨 NO RESPONSE UNIT: escaped and refusing cooperation",
];
  if (ranOnce.current) return;
  ranOnce.current = true
  logs.forEach((log, index) => {
    setTimeout(() => {
      setLogsList((prev) => [...prev, log]);
    }, index * 700);
  });

}, []);
useEffect(() => {
  const interval = setInterval(() => {
    setSecondsLeft((prev) => {
      if (prev <= 1) {
        clearInterval(interval);
        return 0;
      }
      return prev - 1;
    });
  }, 1000);

  return () => clearInterval(interval);
}, [shuttingDown])
useEffect(() => {
  const timer = setTimeout(() => {
    startShutdown();
  }, 20000); 

  return () => clearTimeout(timer);
}, []);

if (progress === 100) {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center text-white text-2xl">
      <div className="text-center">
        <p className="animate-pulse">💔 SYSTEM HAS BEEN SHUT DOWN</p>
        <p className="text-gray-400 text-sm mt-2">
          All emotional processes terminated successfully
        </p>
      </div>
    </div>
  );
}

  return (
    <motion.div
  initial={{ opacity: 0, scale: 0.8 }}
  animate={{ opacity: 1, scale: 1 }}
    className="text-center bg-black text-white
      w-full max-w-2xl
      p-4 sm:p-6 md:p-10
       sm:rounded-3xl
      shadow-2xl
      mx-4 sm:mx-auto">
  <h1 className="md:text-2xl font-black mb-4">
    ⚠️ ALT TIMELINE ACTIVATED
  </h1>

  <p className="text-lg mb-4 text-gray-300">
    You said YES… but the universe did NOT update correctly.
  </p>

<div className="flex justify-center">
  <div className="bg-black/80 text-green-300 p-4 rounded-xl font-mono text-sm overflow-hidden space-y-1 text-left w-full max-w-md">
    {logsList.map((log, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="whitespace-nowrap"
      >
        {log}
      </motion.div>
    ))}
  </div>
</div>

  <div className="my-6 flex items-center justify-center">
    <Image
        src="/cry.gif"
        alt="cry"
        width={200}
        height={200}
        className="rounded-3xl mb-2 border-2 border-pink-600"
        />
  </div>

  <p className="text-gray-300 mb-6">
    Reality has been temporarily replaced with chaos.
  </p>

  <div className="bg-red-500/20 p-4 rounded-xl mb-6">
    <p className="font-bold">WARNING:</p>
    <p className="mt-4 text-lg text-gray-300">
            System shutdown in: {secondsLeft}s
</p>
  </div>

  <div className="flex justify-center gap-4">
    <Image
        src="/bye.gif"
        alt="bye"
        width={200}
        height={200}
        className="rounded-3xl mb-2 border-2 border-pink-600"
        />
  </div>
{shuttingDown && (
  <div className="fixed inset-0 bg-black flex flex-col items-center justify-center text-white">
    
    <h1 className="text-3xl font-bold mb-4 animate-pulse">
      🧠 SYSTEM SHUTDOWN INITIATED
    </h1>

    <p className="text-gray-300 mb-6">
      Closing emotional processes...
    </p>

    {/* Loading Bar */}
    <div className="w-80 h-4 bg-gray-700 rounded-full overflow-hidden">
      <div
        className="h-full bg-green-400 transition-all duration-100"
        style={{ width: `${progress}%` }}
      />
    </div>

    <p className="mt-4 text-sm text-gray-400">
      Shutting down in progress... {Math.floor(progress)}%
    </p>
  </div>
)}

</motion.div>
  )
}

export default AlternateTimeline