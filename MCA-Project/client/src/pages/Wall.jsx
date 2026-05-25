import { useEffect, useState } from 'react';
import api from '../services/api';
import MemoryCard from '../components/MemoryCard';
import Masonry from 'react-masonry-css';

const Wall = () => {

  const [memories, setMemories] = useState([]);

  useEffect(() => {

    const fetchMemories = async () => {

      try {

        const { data } =
          await api.get('/memories');

        // Remove memories with deleted users
        const filtered =
          data.filter(
            (m) => m?.userId !== null
          );

        setMemories(filtered);

      } catch (err) {

        console.log(
          'Fetch error:',
          err
        );

      }

    };

    fetchMemories();

  }, []);

  // Trending memory

  const trendingMemory =
    [...memories] // copy array
      .sort((a, b) => {

        const aTotal =
          Object.values(
            a.reactions || {}
          ).reduce(
            (x, y) => x + y,
            0
          );

        const bTotal =
          Object.values(
            b.reactions || {}
          ).reduce(
            (x, y) => x + y,
            0
          );

        return bTotal - aTotal;

      })[0];

  return (

    <div className="max-w-7xl mx-auto p-6">

      <h2 className="text-3xl font-bold mb-8">
        Memory Wall
      </h2>

      {/* Trending Memory */}

      {trendingMemory && (

        <div className="mb-10">

          <h3 className="text-2xl font-semibold mb-4 text-yellow-400">
            🔥 Trending Memory
          </h3>

          <div className="max-w-md">
            <MemoryCard
              memory={trendingMemory}
            />
          </div>

        </div>

      )}

      {/* All Memories */}

      <Masonry
        breakpointCols={{
          default: 3,
          1100: 2,
          700: 1
        }}
        className="flex w-auto gap-6"
        columnClassName="space-y-6"
      >

        {memories.map((memory) => (

          <MemoryCard
            key={memory._id}
            memory={memory}
          />

        ))}

      </Masonry>

    </div>

  );

};

export default Wall;