import {

  useEffect,

  useState

} from "react";

import {

  MessageSquare,

  Trash2,

  Send,

  Sparkles

} from "lucide-react";

import { format }
from "timeago.js";

import toast from "react-hot-toast";

import { motion }
from "framer-motion";

import api
from "../services/api";

const Feedback = () => {

  // ================= STATES =================

  const [message, setMessage] =
    useState("");

  const [feedbacks, setFeedbacks] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  // ================= FETCH MY FEEDBACK =================

  const fetchFeedbacks =
    async () => {

      try {

        const { data } =
          await api.get(
            "/feedback/my"
          );

        setFeedbacks(data);

      } catch (error) {

        console.log(error);

      }

    };

  useEffect(() => {

    fetchFeedbacks();

  }, []);

  // ================= ADD FEEDBACK =================

  const submitFeedback =
    async (e) => {

      e.preventDefault();

      try {

        if (!message.trim()) {

          return toast.error(
            "Please write something"
          );

        }

        setLoading(true);

        await api.post(
          "/feedback",
          { message }
        );

        toast.success(
          "Suggestion submitted ❤️"
        );

        setMessage("");

        fetchFeedbacks();

      } catch (error) {

        console.log(error);

        toast.error(
          "Failed to submit"
        );

      } finally {

        setLoading(false);

      }

    };

  // ================= DELETE FEEDBACK =================

  const deleteFeedback =
    async (id) => {

      try {

        await api.delete(
          `/feedback/${id}`
        );

        setFeedbacks(

          feedbacks.filter(

            (f) =>
              f._id !== id

          )

        );

        toast.success(
          "Suggestion deleted"
        );

      } catch (error) {

        console.log(error);

        toast.error(
          "Delete failed"
        );

      }

    };

  return (

    <div className="min-h-screen bg-[#050816] text-white relative overflow-hidden">

      {/* GLOW EFFECTS */}

      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-700/20 blur-3xl rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-700/20 blur-3xl rounded-full"></div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-10">

        {/* HEADER */}

        <motion.div

          initial={{
            opacity: 0,
            y: -20
          }}

          animate={{
            opacity: 1,
            y: 0
          }}

          transition={{
            duration: 0.4
          }}

          className="text-center mb-10"

        >

          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-r from-purple-600 to-pink-500 flex items-center justify-center shadow-xl shadow-purple-500/30 mb-5">

            <Sparkles size={26} />

          </div>

          <h1 className="text-4xl font-bold mb-3">

            My Suggestions ✨

          </h1>

          <p className="text-gray-400">

            Share ideas and improvements for MCA Memory Wall

          </p>

        </motion.div>

        {/* FORM */}

        <motion.form

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

          onSubmit={submitFeedback}

          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 mb-10 shadow-2xl"

        >

          <textarea

            rows="5"

            placeholder="Write your suggestion here..."

            value={message}

            onChange={(e) =>
              setMessage(
                e.target.value
              )
            }

            className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 outline-none resize-none focus:border-purple-500 text-sm"

          />

          <button

            disabled={loading}

            className="mt-5 w-full bg-gradient-to-r from-purple-600 to-pink-500 py-3 rounded-xl font-semibold hover:opacity-90 transition flex items-center justify-center gap-2"

          >

            <Send size={18} />

            {

              loading

                ? "Posting..."

                : "Post Suggestion"

            }

          </button>

        </motion.form>

        {/* FEEDBACK LIST */}

        <div className="space-y-5">

          {feedbacks.length === 0 ? (

            <div className="text-center py-20 text-gray-400">

              <MessageSquare
                size={60}
                className="mx-auto mb-5 opacity-50"
              />

              <h2 className="text-2xl font-bold mb-3 text-white">

                No Suggestions Yet

              </h2>

              <p>

                Your suggestions will appear here.

              </p>

            </div>

          ) : (

            feedbacks.map(
              (feedback) => (

                <motion.div

                  key={feedback._id}

                  initial={{
                    opacity: 0,
                    y: 20
                  }}

                  animate={{
                    opacity: 1,
                    y: 0
                  }}

                  transition={{
                    duration: 0.3
                  }}

                  className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-5 shadow-xl"

                >

                  {/* TOP */}

                  <div className="flex justify-between items-start mb-4">

                    <div className="flex items-center gap-3">

                      <img

                        src={
                          feedback.userId
                            ?.profileImage ||

                          "/default.png"
                        }

                        alt="profile"

                        className="w-11 h-11 rounded-full border-2 border-purple-500 object-cover"

                      />

                      <div>

                        <h3 className="font-semibold">

                          {
                            feedback.userId
                              ?.name
                          }

                        </h3>

                        <p className="text-xs text-gray-400">

                          {format(
                            feedback.createdAt
                          )}

                        </p>

                      </div>

                    </div>

                    {/* DELETE */}

                    <button

                      onClick={() =>
                        deleteFeedback(
                          feedback._id
                        )
                      }

                      className="text-red-400 hover:text-red-300 transition"

                    >

                      <Trash2 size={18} />

                    </button>

                  </div>

                  {/* MESSAGE */}

                  <p className="text-gray-300 leading-relaxed break-words">

                    {feedback.message}

                  </p>

                </motion.div>

              )
            )

          )}

        </div>

      </div>

    </div>

  );

};

export default Feedback;