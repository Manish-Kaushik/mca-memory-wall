import { Heart, Flame, Laugh, Frown } from "lucide-react";

import { useState } from "react";

import api from "../services/api";

const MemoryCard = ({ memory }) => {
  // safety check

  if (!memory || !memory.userId) return null;

  // reactions state

  const [reactions, setReactions] = useState(
    memory.reactions || {
      love: 0,
      fire: 0,
      funny: 0,
      sad: 0,
    },
  );

  // clicked state

  const [clicked, setClicked] = useState({
    love: false,
    fire: false,
    funny: false,
    sad: false,
  });

  // reaction function

  const reactMemory = async (type) => {
    try {
      // remove reaction

      if (clicked[type]) {
        setReactions({
          ...reactions,

          [type]: Math.max((reactions[type] || 1) - 1, 0),
        });

        setClicked({
          ...clicked,

          [type]: false,
        });

        return;
      }

      // add reaction

      await api.put(`/memories/react/${memory._id}`, { type });

      setReactions({
        ...reactions,

        [type]: (reactions[type] || 0) + 1,
      });

      setClicked({
        ...clicked,

        [type]: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-gray-800 rounded-2xl overflow-hidden break-inside-avoid shadow-xl border border-gray-700 hover:scale-[1.01] transition duration-300">
      {/* IMAGE */}

      <img
        src={memory.image || "https://via.placeholder.com/500"}
        alt="memory"
        className="w-full object-cover"
      />

      <div className="p-4">
        {/* USER */}

        <div className="flex items-center gap-2 mb-3">
          <img
            src={
              memory.userId?.profileImage || "https://via.placeholder.com/40"
            }
            alt="user"
            className="w-9 h-9 rounded-full border-2 border-purple-500"
          />

          <span className="font-semibold text-sm">
            {memory.userId?.name || "Unknown User"}
          </span>
        </div>

        {/* MESSAGE */}

        <p className="text-gray-300 italic mb-3 leading-relaxed">
          "{memory.message}"
        </p>

        {/* CATEGORY + DATE */}

        <div className="flex justify-between text-xs text-gray-500 mb-4">
          <span className="bg-purple-500/10 text-purple-300 px-3 py-1 rounded-full border border-purple-500/20">
            {memory.category}
          </span>

          <span>{new Date(memory.createdAt).toLocaleDateString()}</span>
        </div>

        {/* REACTIONS */}

        <div className="flex justify-between items-center">
          {/* LOVE */}

          <button
            onClick={() => reactMemory("love")}
            className={`flex items-center gap-1 px-3 py-1 rounded-full transition-all duration-200 ${
              clicked.love
                ? "bg-pink-500/20 text-pink-500 scale-110 shadow-lg shadow-pink-500/30"
                : "text-gray-400 hover:text-pink-400"
            }`}
          >
            <Heart size={18} fill={clicked.love ? "currentColor" : "none"} />

            {reactions.love || 0}
          </button>

          {/* FIRE */}

          <button
            onClick={() => reactMemory("fire")}
            className={`flex items-center gap-1 px-3 py-1 rounded-full transition-all duration-200 ${
              clicked.fire
                ? "bg-orange-500/20 text-orange-500 scale-110 shadow-lg shadow-orange-500/30"
                : "text-gray-400 hover:text-orange-400"
            }`}
          >
            <Flame size={18} />

            {reactions.fire || 0}
          </button>

          {/* FUNNY */}

          <button
            onClick={() => reactMemory("funny")}
            className={`flex items-center gap-1 px-3 py-1 rounded-full transition-all duration-200 ${
              clicked.funny
                ? "bg-yellow-500/20 text-yellow-400 scale-110 shadow-lg shadow-yellow-500/30"
                : "text-gray-400 hover:text-yellow-300"
            }`}
          >
            <Laugh size={18} />

            {reactions.funny || 0}
          </button>

          {/* SAD */}

          <button
            onClick={() => reactMemory("sad")}
            className={`flex items-center gap-1 px-3 py-1 rounded-full transition-all duration-200 ${
              clicked.sad
                ? "bg-blue-500/20 text-blue-400 scale-110 shadow-lg shadow-blue-500/30"
                : "text-gray-400 hover:text-blue-300"
            }`}
          >
            <Frown size={18} />

            {reactions.sad || 0}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MemoryCard;
