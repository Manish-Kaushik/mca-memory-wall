const mongoose = require('mongoose');

const memorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  image: { type: String, required: true },
  message: { type: String, required: true, maxlength: 150 },
  category: { type: String, required: true },
  reactions: {
    love: { type: Number, default: 0 },
    funny: { type: Number, default: 0 },
    fire: { type: Number, default: 0 },
    emotional: { type: Number, default: 0 }
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Memory', memorySchema);