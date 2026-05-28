const mongoose = require('mongoose');

const memorySchema =
  new mongoose.Schema(

    {

      // ================= USER =================

      userId: {

        type:
          mongoose.Schema.Types.ObjectId,

        ref: 'User',

        required: true

      },

      // ================= IMAGE =================

      image: {

        type: String,

        required: true,

        trim: true

      },

      // ================= MESSAGE =================

      message: {

        type: String,

        required: true,

        trim: true,

        maxlength: 150

      },

      // ================= CATEGORY =================

      category: {

        type: String,

        required: true,

        enum: [

          'Friends',

          'Farewell',

          'Classroom',

          'Trip',

          'Events',

          'Me',

          'Other'

        ]

      },

      // ================= REACTIONS =================

      reactions: {

        love: [

          {

            type:
              mongoose.Schema.Types.ObjectId,

            ref: 'User'

          }

        ],

        funny: [

          {

            type:
              mongoose.Schema.Types.ObjectId,

            ref: 'User'

          }

        ],

        fire: [

          {

            type:
              mongoose.Schema.Types.ObjectId,

            ref: 'User'

          }

        ],

        sad: [

          {

            type:
              mongoose.Schema.Types.ObjectId,

            ref: 'User'

          }

        ]

      },

      // ================= TAGS =================

      tags: [

        {

          type: String,

          trim: true

        }

      ],

      // ================= PIN MEMORY =================

      isPinned: {

        type: Boolean,

        default: false

      },

      // ================= VISIBILITY =================

      isPublic: {

        type: Boolean,

        default: true

      }

    },

    {

      timestamps: true

    }

  );


// ================= INDEXING =================

// BETTER SEARCH PERFORMANCE

memorySchema.index({

  message: 'text',

  category: 'text',

  tags: 'text'

});


// ================= EXPORT MODEL =================

module.exports =

  mongoose.model(

    'Memory',

    memorySchema

  );