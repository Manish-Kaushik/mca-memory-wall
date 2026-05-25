import { useEffect, useState } from 'react';
import api from '../services/api';
import MemoryCard from '../components/MemoryCard'; // Ensure you create this component

const Wall = () => {
  const [memories, setMemories] = useState([]);

  useEffect(() => {
    const fetchMemories = async () => {
      try {
        const { data } = await api.get('/memories');

        // ✅ NULL user हटाओ
        const filtered = data.filter(m => m.userId !== null);

        setMemories(filtered);
      } catch (err) {
        console.log("Fetch error:", err);
      }
    };

    fetchMemories();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-8">Memory Wall</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {memories.map(memory => (
          <MemoryCard key={memory._id} memory={memory} />
        ))}
      </div>
    </div>
  );
};

export default Wall;
