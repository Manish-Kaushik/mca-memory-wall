import {
  useEffect,
  useMemo,
  useState
} from 'react';

import api from '../services/api';

import MemoryCard from '../components/MemoryCard';

import Masonry from 'react-masonry-css';

import {
  Flame,
  Search,
  Sparkles
} from 'lucide-react';

const Wall = () => {

  // ================= STATES =================

  const [memories, setMemories] =
    useState([]);

  const [search, setSearch] =
    useState('');

  const [
    selectedCategory,
    setSelectedCategory
  ] = useState('All');

  const [loading, setLoading] =
    useState(true);

  // ================= FETCH MEMORIES =================

  useEffect(() => {

    const fetchMemories =
      async () => {

        try {

          const { data } =
            await api.get(
              '/memories'
            );

          // REMOVE DELETED USERS

          const filtered =
            data.filter(
              (m) =>
                m?.userId !== null
            );

          setMemories(filtered);

        } catch (err) {

          console.log(
            'Fetch error:',
            err
          );

        } finally {

          setLoading(false);

        }

      };

    fetchMemories();

  }, []);

  // ================= CATEGORIES =================

  const categories =
    useMemo(() => {

      const allCategories =
        memories.map(
          (m) => m.category
        );

      return [
        'All',
        ...new Set(allCategories)
      ];

    }, [memories]);

  // ================= FILTER MEMORIES =================

  const filteredMemories =
    memories?.filter(
      (memory) => {

        const matchesSearch =

          memory.message
            ?.toLowerCase()

            .includes(
              search.toLowerCase()
            )

          ||

          memory.userId?.name
            ?.toLowerCase()

            .includes(
              search.toLowerCase()
            );

        const matchesCategory =

          selectedCategory ===
          'All'

          ||

          memory.category ===
          selectedCategory;

        return (
          matchesSearch &&
          matchesCategory
        );

      }
    );

  // ================= TRENDING MEMORY =================

  const trendingMemory =
    [...memories]

      .sort((a, b) => {

        const aTotal =
          Object.values(
            a.reactions || {}
          ).reduce(

            (total, arr) =>
              total +
              (arr?.length || 0),

            0

          );

        const bTotal =
          Object.values(
            b.reactions || {}
          ).reduce(

            (total, arr) =>
              total +
              (arr?.length || 0),

            0

          );

        return bTotal - aTotal;

      })[0];

  // ================= LOADING =================

  if (loading) {

    return (

      <div className="min-h-screen bg-[#050816] flex items-center justify-center">

        <div className="text-center">

          <div className="w-14 h-14 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-5"></div>

          <p className="text-gray-400 text-lg">

            Loading Memories...

          </p>

        </div>

      </div>

    );

  }

  return (

    <div className="min-h-screen bg-[#050816] text-white relative overflow-hidden">

      {/* BACKGROUND GLOW */}

      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-700/20 blur-3xl rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-700/20 blur-3xl rounded-full"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-10">

        {/* HEADER */}

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10">

          <div>

            <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 text-purple-300 px-4 py-2 rounded-full mb-4">

              <Sparkles size={16} />

              MCA Memory Wall

            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-3">

              Explore Memories ✨

            </h1>

            <p className="text-gray-400 max-w-2xl">

              Relive unforgettable moments,
              friendships, classroom memories,
              trips, and college life.

            </p>

          </div>

          {/* SEARCH */}

          <div className="relative w-full lg:w-96">

            <Search
              size={18}
              className="absolute left-4 top-4 text-gray-400"
            />

            <input
              type="text"

              placeholder="Search memories or users..."

              value={search}

              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }

              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none backdrop-blur-md focus:border-purple-500 transition"
            />

          </div>

        </div>

        {/* TRENDING MEMORY */}

        {trendingMemory && (

          <div className="mb-14">

            <div className="flex items-center gap-2 mb-6">

              <Flame
                size={24}
                className="text-orange-400"
              />

              <h2 className="text-3xl font-bold">

                Trending Memory

              </h2>

            </div>

            <div className="max-w-xl">

              <MemoryCard
                memory={trendingMemory}
              />

            </div>

          </div>

        )}

        {/* CATEGORIES */}

        <div className="flex gap-3 overflow-x-auto pb-3 mb-10 scrollbar-hide">

          {categories.map(
            (category) => (

              <button
                key={category}

                onClick={() =>
                  setSelectedCategory(
                    category
                  )
                }

                className={`px-5 py-2 rounded-full whitespace-nowrap border transition duration-300 ${
                  selectedCategory ===
                  category

                    ? 'bg-gradient-to-r from-purple-600 to-pink-500 border-transparent'

                    : 'bg-white/5 border-white/10 hover:bg-white/10'
                }`}
              >

                {category}

              </button>

            )
          )}

        </div>

        {/* MEMORIES GRID */}

        <Masonry
          breakpointCols={{
            default: 3,
            1100: 2,
            700: 1
          }}

          className="flex gap-6"

          columnClassName="space-y-6"
        >

          {filteredMemories.map(
            (memory) => (

              <div
                key={memory._id}
                className="animate-fadeIn"
              >

                <MemoryCard
                  memory={memory}
                />

              </div>

            )
          )}

        </Masonry>

        {/* EMPTY STATE */}

        {filteredMemories.length === 0 && (

          <div className="text-center py-24">

            <h2 className="text-3xl font-bold mb-4">

              No Memories Found 😢

            </h2>

            <p className="text-gray-400">

              Try another search or category.

            </p>

          </div>

        )}

      </div>

    </div>

  );

};

export default Wall;