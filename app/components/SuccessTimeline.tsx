import { motion } from "framer-motion";
import { useState } from "react";
type SuccessProps = {
  launchConfetti: () => void;
  setAccepted:React.Dispatch<React.SetStateAction<boolean>>
};
const SuccessTimeline = ({launchConfetti,setAccepted}:SuccessProps) => {
    const [noPos, setNoPos] = useState({ x: 0, y: 0 });
    const [noText, setNoText] = useState("No 💔");
    const [yesScale, setYesScale] = useState(1);

    const funnyTexts = [
    "Wrong answer 😭",
    "404: Rejection not found",
    "Nice try 😂",
    "This button believes in love 💘",
    "System error 🚨",
    ];
    
    const moveNoButton = () => {
    const randomX = Math.random() * 300 - 150;
    const randomY = Math.random() * 300 - 150;
    setNoPos({ x: randomX, y: randomY });
    setNoText(
      funnyTexts[Math.floor(Math.random() * funnyTexts.length)]
    );

    setYesScale((prev) => prev + 0.1);
  };

  return (
          <div className="relative text-center bg-white/30 backdrop-blur-lg p-10 rounded-3xl shadow-2xl border border-white/40 max-w-xl w-full">
          <motion.h1
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-5xl font-black text-pink-600 mb-4"
          >
            Will You Go On A Date With Me? 🥺👉👈
          </motion.h1>

          <p className="text-gray-700 mb-10 text-lg">
            Careful... one button is emotionally unavailable.
          </p>

          <div className="flex items-center justify-center gap-6 relative h-40">
            <motion.button
              animate={{ scale: yesScale }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
              launchConfetti();
              setAccepted(true);
            }}
              className="px-10 py-4 rounded-full text-white text-2xl font-bold bg-gradient-to-r cursor-pointer from-pink-500 to-rose-500 shadow-xl"
            >
              YES 💖
            </motion.button>

            <motion.button
              animate={{
                x: noPos.x,
                y: noPos.y,
                rotate: Math.random() * 20 - 10,
              }}
              transition={{ type: "spring", stiffness: 300 }}
              onMouseEnter={moveNoButton}
              onClick={moveNoButton}
              className="absolute px-6 py-3 rounded-full bg-gray-800 text-white font-bold cursor-pointer"
            >
              {noText}
            </motion.button>
          </div>
        </div>
  )
}

export default SuccessTimeline