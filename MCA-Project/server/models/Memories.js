const mongoose = require('mongoose');

const memorySchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  image: {
    type: String,
    required: true
  },

  message: {
    type: String,
    required: true,
    maxlength: 150
  },

  category: {
    type: String,
    required: true
  },

  reactions: {

    love: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ],

    funny: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ],

    fire: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ],

    sad: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ]

  },

  createdAt: {
    type: Date,
    default: Date.now
  }

});

module.exports =
  mongoose.model('Memory', memorySchema);