import {
  Heart,
  Flame,
  Laugh,
  Frown
} from "lucide-react";

import {
  useContext,
  useState
} from "react";

import { format } from "timeago.js";

import toast from "react-hot-toast";

import { motion } from "framer-motion";

import api from "../services/api";

import {
  AuthContext
} from "../context/AuthContext";

const MemoryCard = ({ memory }) => {

  if (!memory || !memory.userId)
    return null;

  const { user } =
    useContext(AuthContext);

  const [reactions, setReactions] =
    useState(

      memory.reactions || {

        love: [],

        fire: [],

        funny: [],

        sad: []

      }

    );

  // ================= CHECK REACTED =================

  const hasReacted = (type) => {

    return reactions[type]?.includes(
      user?._id
    );

  };

  // ================= REACT FUNCTION =================

  const reactMemory =
    async (type) => {

      try {

        const { data } =
          await api.put(

            `/memories/react/${memory._id}`,

            { type }

          );

        setReactions(
          data.reactions
        );

      } catch (error) {

        console.log(error);

        toast.error(
          "Reaction failed"
        );

      }

    };

  return (

    <motion.div

      initial={{
        opacity: 0,
        y: 20
      }}

      animate={{
        opacity: 1,
        y: 0
      }}

      transition={{
        duration: 0.4
      }}

      className="bg-gray-800/90 backdrop-blur-xl rounded-3xl overflow-hidden break-inside-avoid shadow-2xl border border-gray-700 hover:scale-[1.015] transition duration-300"

    >

      {/* IMAGE */}

      <img

        src={
          memory.image ||
          "https://via.placeholder.com/500"
        }

        alt="memory"

        loading="lazy"

        className="w-full object-cover max-h-[500px]"

      />

      <div className="p-5">

        {/* USER */}

        <div className="flex items-center gap-3 mb-4">

          <img

            src={
              memory.userId?.profileImage ||
              "/default.png"
            }

            alt="user"

            loading="lazy"

            className="w-10 h-10 rounded-full border-2 border-purple-500 object-cover"

          />

          <div>

            <h3 className="font-semibold text-sm">

              {memory.userId?.name ||
                "Unknown User"}

            </h3>

            <p className="text-xs text-gray-400">

              {format(
                memory.createdAt
              )}

            </p>

          </div>

        </div>

        {/* MESSAGE */}

        <p className="text-gray-300 italic mb-4 leading-relaxed break-words">

          "{memory.message}"

        </p>

        {/* CATEGORY */}

        <div className="flex justify-between items-center text-xs text-gray-400 mb-5">

          <span className="bg-purple-500/10 text-purple-300 px-3 py-1 rounded-full border border-purple-500/20">

            {memory.category}

          </span>

        </div>

        {/* REACTIONS */}

        <div className="flex justify-between items-center">

          {/* LOVE */}

          <button

            onClick={() =>
              reactMemory("love")
            }

            className={`flex items-center gap-1 px-3 py-1 rounded-full transition-all duration-200 ${
              hasReacted("love")

                ? "bg-pink-500/20 text-pink-500 scale-110 shadow-lg shadow-pink-500/30"

                : "text-gray-400 hover:text-pink-400"
            }`}

          >

            <Heart

              size={18}

              fill={
                hasReacted("love")
                  ? "currentColor"
                  : "none"
              }

            />

            {reactions.love?.length || 0}

          </button>

          {/* FIRE */}

          <button

            onClick={() =>
              reactMemory("fire")
            }

            className={`flex items-center gap-1 px-3 py-1 rounded-full transition-all duration-200 ${
              hasReacted("fire")

                ? "bg-orange-500/20 text-orange-500 scale-110 shadow-lg shadow-orange-500/30"

                : "text-gray-400 hover:text-orange-400"
            }`}

          >

            <Flame size={18} />

            {reactions.fire?.length || 0}

          </button>

          {/* FUNNY */}

          <button

            onClick={() =>
              reactMemory("funny")
            }

            className={`flex items-center gap-1 px-3 py-1 rounded-full transition-all duration-200 ${
              hasReacted("funny")

                ? "bg-yellow-500/20 text-yellow-400 scale-110 shadow-lg shadow-yellow-500/30"

                : "text-gray-400 hover:text-yellow-300"
            }`}

          >

            <Laugh size={18} />

            {reactions.funny?.length || 0}

          </button>

          {/* SAD */}

          <button

            onClick={() =>
              reactMemory("sad")
            }

            className={`flex items-center gap-1 px-3 py-1 rounded-full transition-all duration-200 ${
              hasReacted("sad")

                ? "bg-blue-500/20 text-blue-400 scale-110 shadow-lg shadow-blue-500/30"

                : "text-gray-400 hover:text-blue-300"
            }`}

          >

            <Frown size={18} />

            {reactions.sad?.length || 0}

          </button>

        </div>

      </div>

    </motion.div>

  );

};

export default MemoryCard;