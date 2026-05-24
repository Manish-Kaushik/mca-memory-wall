import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 relative overflow-hidden bg-gray-900">
      <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
        Memories That Will <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          Never Fade
        </span>
      </h1>
      <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10">
        A digital wall preserving friendships, laughter, and unforgettable moments of our MCA journey.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link to="/wall" className="bg-white text-gray-900 px-8 py-4 rounded-full font-bold hover:bg-gray-200 transition flex items-center gap-2">
          Explore Memories <ArrowRight size={20} />
        </Link>
        <Link to="/register" className="bg-gray-800 border border-gray-700 text-white px-8 py-4 rounded-full font-bold hover:bg-gray-700 transition">
          Join Batch
        </Link>
      </div>
    </div>
  );
};

export default Home;