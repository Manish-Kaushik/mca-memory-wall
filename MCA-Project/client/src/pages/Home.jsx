import { Link } from 'react-router-dom';

import {
  ArrowRight,
  ImageIcon,
  Sparkles,
  Users,
  Heart
} from 'lucide-react';

const Home = () => {

  return (

    <div className="relative min-h-screen overflow-hidden bg-[#050816] text-white">

      {/* BACKGROUND GLOW */}

      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-700/20 blur-3xl rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-600/20 blur-3xl rounded-full"></div>

      {/* HERO */}

      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-20 text-center">

        {/* BATCH TAG */}

        <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 text-purple-300 px-5 py-2 rounded-full mb-8 backdrop-blur-md">

          <Sparkles size={16} />

          <span className="text-sm font-medium">

            MCA Batch 2024–26

          </span>

        </div>

        {/* TITLE */}

        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-8 tracking-tight">

          Memories That Will

          <br />

          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">

            Never Fade

          </span>

        </h1>

        {/* DESCRIPTION */}

        <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-12">

          A digital memory wall preserving friendships,
          laughter, classroom moments, trips,
          farewells, and unforgettable memories
          from our MCA journey.

        </p>

        {/* BUTTONS */}

        <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">

          <Link
            to="/wall"
            className="group bg-white text-black px-8 py-4 rounded-2xl font-bold flex items-center gap-3 hover:scale-105 transition duration-300 shadow-2xl"
          >

            Explore Memories

            <ArrowRight
              size={20}
              className="group-hover:translate-x-1 transition"
            />

          </Link>

          <Link
            to="/register"
            className="border border-white/10 bg-white/5 backdrop-blur-md px-8 py-4 rounded-2xl font-semibold hover:bg-white/10 transition duration-300"
          >

            Join The Wall

          </Link>

        </div>

        {/* STATS */}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-24">

          {/* CARD 1 */}

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl hover:scale-105 transition duration-300 shadow-xl">

            <div className="w-14 h-14 rounded-2xl bg-purple-500/20 flex items-center justify-center mx-auto mb-5">

              <ImageIcon
                size={28}
                className="text-purple-400"
              />

            </div>

            <h3 className="text-3xl font-bold mb-2">

              100+

            </h3>

            <p className="text-gray-400">

              Memories Shared

            </p>

          </div>

          {/* CARD 2 */}

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl hover:scale-105 transition duration-300 shadow-xl">

            <div className="w-14 h-14 rounded-2xl bg-pink-500/20 flex items-center justify-center mx-auto mb-5">

              <Users
                size={28}
                className="text-pink-400"
              />

            </div>

            <h3 className="text-3xl font-bold mb-2">

              MCA 2024–26

            </h3>

            <p className="text-gray-400">

              Connected Together

            </p>

          </div>

          {/* CARD 3 */}

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl hover:scale-105 transition duration-300 shadow-xl">

            <div className="w-14 h-14 rounded-2xl bg-blue-500/20 flex items-center justify-center mx-auto mb-5">

              <Heart
                size={28}
                className="text-blue-400"
              />

            </div>

            <h3 className="text-3xl font-bold mb-2">

              Forever

            </h3>

            <p className="text-gray-400">

              Moments Preserved

            </p>

          </div>

        </div>

      </section>

      {/* FOOTER */}

      <footer className="relative z-10 border-t border-white/10 mt-10 py-8 text-center text-gray-500 text-sm">

        <p>

          Made with ❤️ by MCA Batch 2024–26

        </p>

        <p className="mt-2 text-gray-600">

          © 2026 MCA Memory Wall. All rights reserved.

        </p>

      </footer>

    </div>

  );

};

export default Home;