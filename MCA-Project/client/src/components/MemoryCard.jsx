import {
  Heart,
  Flame,
  Laugh,
  Frown
} from 'lucide-react';

import api from '../services/api';

const MemoryCard = ({ memory }) => {

  // Safety check
  if (!memory || !memory.userId) return null;

  // React function

  const reactMemory = async (type) => {

    try {

      await api.put(
        `/memories/react/${memory._id}`,
        { type }
      );

      // update UI instantly

      memory.reactions = {
        ...memory.reactions,
        [type]:
          (memory.reactions?.[type] || 0) + 1
      };

      window.location.reload();

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

        {/* User Info */}

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
            {memory.userId?.name || "Unknown User"}
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

          <button
            onClick={() =>
              reactMemory('love')
            }
            className="flex items-center gap-1 text-pink-400 hover:scale-110 transition"
          >
            <Heart size={16} />
            {memory.reactions?.love || 0}
          </button>

          <button
            onClick={() =>
              reactMemory('fire')
            }
            className="flex items-center gap-1 text-orange-400 hover:scale-110 transition"
          >
            <Flame size={16} />
            {memory.reactions?.fire || 0}
          </button>

          <button
            onClick={() =>
              reactMemory('funny')
            }
            className="flex items-center gap-1 text-yellow-400 hover:scale-110 transition"
          >
            <Laugh size={16} />
            {memory.reactions?.funny || 0}
          </button>

          <button
            onClick={() =>
              reactMemory('sad')
            }
            className="flex items-center gap-1 text-blue-400 hover:scale-110 transition"
          >
            <Frown size={16} />
            {memory.reactions?.sad || 0}
          </button>

        </div>

      </div>

    </div>

  );

};

export default MemoryCard;