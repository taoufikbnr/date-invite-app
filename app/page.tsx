"use client";

import {  useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { supabase } from "@/lib/supabaseClient";
import SuccessTimeline from "./components/SuccessTimeline";
import AlternateTimeline from "./components/AlternateTimeline";

const activities = [
  { emoji: "🍕", label: "Food Date" },
  { emoji: "🎬", label: "Movie Night" },
  { emoji: "☕", label: "Coffee" },
  { emoji: "🎳", label: "Bowling" },
  { emoji: "🎮", label: "Gaming" },
  { emoji: "🌅", label: "Sunset Walk" },
  { emoji: "🧋", label: "Bubble Tea" },
  { emoji: "🎡", label: "Funfair" },
  { emoji: "🎤", label: "Other" },
];


export default function Home() {
  const [accepted, setAccepted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [altScenario, setAltScenario] = useState(false);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
const [errors, setErrors] = useState({
  date: false,
  time: false,
  activities: false,
});

      const toggleActivity = (activity: string) => {
        if (selectedActivities.includes(activity)) {
          setSelectedActivities(
            selectedActivities.filter((a) => a !== activity)
          );
        } else {
          setSelectedActivities([
            ...selectedActivities,
            activity,
          ]);

          setErrors((prev) => ({
            ...prev,
            activities: false,
          }));
        }
      };
const handleSubmit = async () => {
  const newErrors = {
    date: !date,
    time: !time,
    activities: selectedActivities.length === 0,
  };

  setErrors(newErrors);

  if (
    newErrors.date ||
    newErrors.time ||
    newErrors.activities
  ) {
    return;
  }

  const { error } = await supabase.from("dates").insert([
    {
      date,
      time,
      activities: selectedActivities,
    },
  ]);

  if (!error) {
    setSubmitted(true);
    launchConfetti();
  } else {
    alert("Something broke 😭");
  }
};
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
    <main className="min-h-screen bg-linear-to-br from-pink-200 via-rose-100 to-purple-200 flex items-center justify-center p-6 overflow-hidden">
      {!accepted ? (
      <SuccessTimeline launchConfetti={launchConfetti}setAccepted={setAccepted} />
      ) : !submitted ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/30 backdrop-blur-lg p-8 rounded-3xl shadow-2xl max-w-2xl w-full"
        >
          <h2 className="text-4xl font-black text-center text-pink-600 mb-8">
            <span className="text-purple-700">YAYYYYY</span>  I KNEW YOU WOULD  SAY YES <img width={50} src={"./pedro-monkey-puppet.gif"} alt="monkey" className="inline-block rounded-2xl"
 />
          </h2>

          <div className="space-y-6">
            <div>
              <label className="font-bold block mb-2">
                Pick a Date 📅
              </label>

                    <input
                type="date"
                value={date}
                onChange={(e) => {
                  setDate(e.target.value);
                  setErrors((prev) => ({ ...prev, date: false }));
                }}
                className={`w-full p-4 rounded-xl border ${
                  errors.date
                    ? "border-red-500 bg-red-50"
                    : "border-gray-300"
                }`}
              />
            </div>

            <div>
              <label className="font-bold block mb-2">
                Pick a Time ⏰
              </label>

          <input
            type="time"
            value={time}
            onChange={(e) => {
              setTime(e.target.value);
              setErrors((prev) => ({ ...prev, time: false }));
            }}
            className={`w-full p-4 rounded-xl border ${
              errors.time
                ? "border-red-500 bg-red-50"
                : "border-gray-300"
            }`}
          />
            </div>

            <div>
              <label className="font-bold block mb-4">
                Choose Activities 🎉
              </label>

                <div
                  className={`grid grid-cols-2 md:grid-cols-3 gap-4 p-2 rounded-2xl ${
                    errors.activities ? "border-2 border-red-500" : ""
                  }`}>
                {activities.map((activity) => {
                  const active = selectedActivities.includes(
                    activity.label
                  );

                  return (
                    <motion.div
                      key={activity.label}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() =>
                        toggleActivity(activity.label)
                      }
                      className={`cursor-pointer rounded-2xl p-5 text-center transition-all ${
                        active
                          ? "bg-pink-500 text-white shadow-xl"
                          : "bg-white"
                      }`}
                    >
                      <div className="text-4xl mb-2">
                        {activity.emoji}
                      </div>

                      <div className="font-bold">
                        {activity.label}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full py-4 rounded-2xl bg-gradient-to-r cursor-pointer from-pink-500 to-rose-500 text-white font-black text-xl shadow-xl"
            >
              Submit 💌
            </button>
          </div>
        </motion.div>
      ):!altScenario?(    
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-center bg-white/30 backdrop-blur-lg p-10 rounded-3xl shadow-2xl max-w-xl"
        >
          <div className="text-7xl mb-6">🎉</div>
          <img src="./joey.gif" alt="joey" className="rounded-3xl mb-2 border-2 border-pink-600" />

          {/* <h1 className="text-5xl font-black text-pink-600 mb-4">
            YOU SAID YESSSS! I KNEW ITT
          </h1> */}

          <p className="text-2xl text-gray-700 mb-4">
            See you on <b>{date}</b> at <b>{time}</b>
          </p>

          <p className="text-lg text-gray-600">
            The council of romance approves this decision 💘
          </p>
          <button
              onClick={() => setAltScenario(true)}
              className="mt-6 px-6 py-3 bg-black text-white rounded-xl font-bold hover:scale-105 transition"
            >
              Show alternate timeline 😈
            </button>
        </motion.div>
    ) : (
  <AlternateTimeline/>
      )}
    </main>
  );
}