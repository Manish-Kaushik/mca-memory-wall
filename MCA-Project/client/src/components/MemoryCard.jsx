import {
  Heart,
  Flame,
  Laugh,
  Frown
} from 'lucide-react';

import { useState } from 'react';

import api from '../services/api';

const MemoryCard = ({ memory }) => {

  // Safety check

  if (!memory || !memory.userId)
    return null;

  // Local reactions state

  const [reactions, setReactions] =
    useState(
      memory.reactions || {
        love: 0,
        fire: 0,
        funny: 0,
        sad: 0
      }
    );

  // Track clicked reactions

  const [clicked, setClicked] =
    useState({
      love: false,
      fire: false,
      funny: false,
      sad: false
    });

  // React function

  const reactMemory =
    async (type) => {

      try {

        // already reacted → remove

        if (clicked[type]) {

          setReactions({

            ...reactions,

            [type]:
              Math.max(
                (reactions[type] || 1) - 1,
                0
              )

          });

          setClicked({
            ...clicked,
            [type]: false
          });

          return;

        }

        // max 2 reactions

        if (
          (reactions[type] || 0) >= 2
        ) return;

        // backend update

        await api.put(
          `/memories/react/${memory._id}`,
          { type }
        );

        // frontend update

        setReactions({

          ...reactions,

          [type]:
            (reactions[type] || 0) + 1

        });

        setClicked({

          ...clicked,

          [type]: true

        });

      } catch (error) {

        console.log(error);

        alert('Reaction failed');

      }

    };

  return (

    <div className="bg-gray-800 rounded-xl overflow-hidden break-inside-avoid shadow-lg border border-gray-700">

      {/* Memory Image */}

      <img
        src={
          memory.image ||
          "https://via.placeholder.com/500"
        }
        alt="memory"
        className="w-full object-cover"
      />

      <div className="p-4">

        {/* User */}

        <div className="flex items-center gap-2 mb-2">

          <img
            src={
              memory.userId?.profileImage ||
              "https://via.placeholder.com/40"
            }
            alt="user"
            className="w-8 h-8 rounded-full"
          />

          <span className="font-bold text-sm">

            {memory.userId?.name ||
              "Unknown User"}

          </span>

        </div>

        {/* Message */}

        <p className="text-gray-300 italic mb-2">

          "{memory.message}"

        </p>

        {/* Category + Date */}

        <div className="flex justify-between text-xs text-gray-500">

          <span>
            {memory.category}
          </span>

          <span>

            {new Date(
              memory.createdAt
            ).toLocaleDateString()}

          </span>

        </div>

        {/* Reactions */}

        <div className="flex justify-between mt-4 text-sm">

          {/* LOVE */}

          <button
            onClick={() =>
              reactMemory('love')
            }

            className={`flex items-center gap-1 transition hover:scale-110 ${
              clicked.love
                ? 'text-pink-600'
                : 'text-pink-400'
            }`}
          >

            <Heart size={16} />

            {reactions.love || 0}

          </button>

          {/* FIRE */}

          <button
            onClick={() =>
              reactMemory('fire')
            }

            className={`flex items-center gap-1 transition hover:scale-110 ${
              clicked.fire
                ? 'text-orange-600'
                : 'text-orange-400'
            }`}
          >

            <Flame size={16} />

            {reactions.fire || 0}

          </button>

          {/* FUNNY */}

          <button
            onClick={() =>
              reactMemory('funny')
            }

            className={`flex items-center gap-1 transition hover:scale-110 ${
              clicked.funny
                ? 'text-yellow-500'
                : 'text-yellow-400'
            }`}
          >

            <Laugh size={16} />

            {reactions.funny || 0}

          </button>

          {/* SAD */}

          <button
            onClick={() =>
              reactMemory('sad')
            }

            className={`flex items-center gap-1 transition hover:scale-110 ${
              clicked.sad
                ? 'text-blue-500'
                : 'text-blue-400'
            }`}
          >

            <Frown size={16} />

            {reactions.sad || 0}

          </button>

        </div>

      </div>

    </div>

  );

};

export default MemoryCard;