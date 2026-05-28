import {

  Heart,

  Flame,

  Laugh,

  Frown,

  Pencil,

  X

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

  // ================= STATES =================

  const [reactions, setReactions] =
    useState(

      memory.reactions || {

        love: [],

        fire: [],

        funny: [],

        sad: []

      }

    );

  const [editOpen, setEditOpen] =
    useState(false);

  const [editMessage, setEditMessage] =
    useState(memory.message);

  const [editCategory, setEditCategory] =
    useState(memory.category);

  const [currentMessage, setCurrentMessage] =
    useState(memory.message);

  const [currentCategory, setCurrentCategory] =
    useState(memory.category);

  const [loading, setLoading] =
    useState(false);

  // ================= CHECK OWNER =================

  const isOwner =

    user?._id ===
    memory.userId?._id;

  // ================= CHECK REACTED =================

  const hasReacted = (type) => {

    return reactions[type]?.includes(
      user?._id
    );

  };

  // ================= REACT =================

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

  // ================= UPDATE MEMORY =================

  const updateMemory =
    async () => {

      try {

        setLoading(true);

        const { data } =
          await api.put(

            `/memories/${memory._id}`,

            {

              message:
                editMessage,

              category:
                editCategory

            }

          );

        setCurrentMessage(
          data.message
        );

        setCurrentCategory(
          data.category
        );

        toast.success(
          "Memory updated ❤️"
        );

        setEditOpen(false);

      } catch (error) {

        console.log(error);

        toast.error(
          "Update failed"
        );

      } finally {

        setLoading(false);

      }

    };

  return (

    <>

      {/* CARD */}

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

          {/* TOP */}

          <div className="flex justify-between items-start mb-4">

            {/* USER */}

            <div className="flex items-center gap-3">

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

            {/* EDIT BUTTON */}

            {isOwner && (

              <button

                onClick={() =>
                  setEditOpen(true)
                }

                className="text-gray-400 hover:text-purple-400 transition"

              >

                <Pencil size={18} />

              </button>

            )}

          </div>

          {/* MESSAGE */}

          <p className="text-gray-300 italic mb-4 leading-relaxed break-words">

            "{currentMessage}"

          </p>

          {/* CATEGORY */}

          <div className="flex justify-between items-center text-xs text-gray-400 mb-5">

            <span className="bg-purple-500/10 text-purple-300 px-3 py-1 rounded-full border border-purple-500/20">

              {currentCategory}

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

      {/* EDIT MODAL */}

      {editOpen && (

        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 px-4">

          <div className="bg-gray-900 border border-white/10 rounded-3xl w-full max-w-lg p-6 relative">

            {/* CLOSE */}

            <button

              onClick={() =>
                setEditOpen(false)
              }

              className="absolute top-4 right-4 text-gray-400 hover:text-white"

            >

              <X size={20} />

            </button>

            <h2 className="text-2xl font-bold mb-5">

              Edit Memory

            </h2>

            {/* MESSAGE */}

            <textarea

              rows="5"

              value={editMessage}

              onChange={(e) =>
                setEditMessage(
                  e.target.value
                )
              }

              className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 outline-none focus:border-purple-500 mb-5 resize-none"

            />

            {/* CATEGORY */}

            <select

              value={editCategory}

              onChange={(e) =>
                setEditCategory(
                  e.target.value
                )
              }

              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-purple-500 mb-6"

            >

              <option>
                Friends
              </option>

              <option>
                Me
              </option>

              <option>
                Classroom
              </option>

              <option>
                Trip
              </option>

              <option>
                Farewell
              </option>

              <option>
                Events
              </option>

            </select>

            {/* BUTTON */}

            <button

              onClick={updateMemory}

              disabled={loading}

              className="w-full bg-gradient-to-r from-purple-600 to-pink-500 py-3 rounded-xl font-semibold hover:opacity-90 transition"

            >

              {

                loading

                  ? "Updating..."

                  : "Save Changes"

              }

            </button>

          </div>

        </div>

      )}

    </>

  );

};

export default MemoryCard;