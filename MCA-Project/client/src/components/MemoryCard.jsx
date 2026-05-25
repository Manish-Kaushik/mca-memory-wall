const MemoryCard = ({ memory }) => {
  // safety checks
  if (!memory) return null;
  if (!memory.userId) return null;

  return (
    <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-700">
      <img
        src={memory.image}
        alt="memory"
        className="w-full h-48 object-cover"
      />

      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <img
            src={memory.userId?.profileImage || "https://via.placeholder.com/40"}
            alt="user"
            className="w-8 h-8 rounded-full"
          />

          <span className="font-bold text-sm">
            {memory.userId?.name || "Unknown User"}
          </span>
        </div>

        <p className="text-gray-300 italic mb-2">
          "{memory.message}"
        </p>

        <div className="flex justify-between text-xs text-gray-500">
          <span>{memory.category}</span>

          <span>
            {new Date(memory.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MemoryCard;
