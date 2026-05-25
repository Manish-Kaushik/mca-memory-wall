import { useEffect, useState } from 'react';
import api from '../services/api';
import MemoryCard from '../components/MemoryCard';
import Masonry from 'react-masonry-css';

const Wall = () => {

  const [memories, setMemories] =
    useState([]);

  useEffect(() => {

    const fetchMemories = async () => {

      try {

        const { data } =
          await api.get('/memories');

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

  return (

    <div className="max-w-7xl mx-auto p-6">

      <h2 className="text-3xl font-bold mb-8">
        Memory Wall
      </h2>

      <Masonry
        breakpointCols={{
          default: 3,
          1100: 2,
          700: 1
        }}

        className="flex gap-6"
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