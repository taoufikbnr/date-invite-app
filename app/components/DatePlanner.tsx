import { supabase } from "@/lib/supabaseClient";
import { motion } from "framer-motion";
import { useState } from "react";

type DatePlannerProps = {
    date:string
    time:string
    setDate:React.Dispatch<React.SetStateAction<string>>
    setTime:React.Dispatch<React.SetStateAction<string>>
    setSubmitted:React.Dispatch<React.SetStateAction<boolean>>
    launchConfetti:()=>void
}

const DatePlanner = ({date,time,setDate,setTime,setSubmitted,launchConfetti}:DatePlannerProps) => {
    const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
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
  return (
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
  )
}

export default DatePlanner