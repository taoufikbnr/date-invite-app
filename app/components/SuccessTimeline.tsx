import { motion } from "framer-motion";
import Image from "next/image";
type SuccessTimelineProps = {
    date:string
    time:string
    setAltScenario:React.Dispatch<React.SetStateAction<boolean>>

}
const SuccessTimeline = ({date,time,setAltScenario}:SuccessTimelineProps) => {
  return (
    <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-center bg-white/30 backdrop-blur-lg p-10 rounded-3xl shadow-2xl max-w-xl"
        >
          <div className="text-7xl mb-6">🎉</div>
                    <Image
                src="/joey.gif"
                alt="joey"
                width={500}
                height={500}
                className="rounded-3xl mb-2 border-2 border-pink-600"
                />
          {/* <h1 className="text-5xl font-black text-pink-600 mb-4">
            YOU SAID YESSSS! I KNEW ITT
          </h1> */}

          <p className="text-2xl text-gray-700 mb-4">
            See you on <b>{date}</b> at <b>{time}</b>
          </p>

          <p className="text-lg text-gray-600">
            The council of romance approves this decision 💘
          </p>
            <p className="text-2xl my-3">
              👇🏿
            </p>

          <button
              onClick={() => setAltScenario(true)}
              className="px-6 py-3 bg-linear-to-r from-purple-800 cursor-pointer to-black text-white rounded-xl font-bold hover:scale-105 transition"
            >
              Show alternate timeline 😭
            </button>
        </motion.div>
  )
}

export default SuccessTimeline