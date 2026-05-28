const mongoose =
  require('mongoose');

const feedbackSchema =
  new mongoose.Schema(

    {

      // ================= USER =================

      userId: {

        type:
          mongoose.Schema.Types.ObjectId,

        ref: 'User',

        required: true

      },

      // ================= MESSAGE =================

      message: {

        type: String,

        required: true,

        trim: true,

        maxlength: 300

      },

      // ================= READ STATUS =================

      isRead: {

        type: Boolean,

        default: false

      }

    },

    {

      timestamps: true

    }

  );

module.exports =

  mongoose.model(

    'Feedback',

    feedbackSchema

  );