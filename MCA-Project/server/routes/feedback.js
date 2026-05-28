const express =
  require('express');

const router =
  express.Router();

const Feedback =
  require('../models/Feedback');

const {
  protect
} = require('../middleware/authMiddleware');


// ================= ADD FEEDBACK =================

router.post(

  '/',

  protect,

  async (req, res) => {

    try {

      const { message } =
        req.body;

      if (!message) {

        return res.status(400).json({

          message:
            'Message required'

        });

      }

      const feedback =
        await Feedback.create({

          userId:
            req.user._id,

          message

        });

      res.status(201).json(
        feedback
      );

    } catch (error) {

      console.log(error);

      res.status(500).json({

        message:
          error.message

      });

    }

  }

);


// ================= GET MY FEEDBACK =================

router.get(

  '/my',

  protect,

  async (req, res) => {

    try {

      const feedbacks =
        await Feedback.find({

          userId:
            req.user._id

        })

          .populate(

            'userId',

            'name profileImage'

          )

          .sort({

            createdAt: -1

          });

      res.json(feedbacks);

    } catch (error) {

      console.log(error);

      res.status(500).json({

        message:
          error.message

      });

    }

  }

);


// ================= ADMIN GET ALL =================

router.get(

  '/all',

  protect,

  async (req, res) => {

    try {

      // ADMIN CHECK

      if (
        req.user.role !==
        'admin'
      ) {

        return res.status(401).json({

          message:
            'Not authorized'

        });

      }

      const feedbacks =
        await Feedback.find()

          .populate(

            'userId',

            'name profileImage'

          )

          .sort({

            createdAt: -1

          });

      res.json(feedbacks);

    } catch (error) {

      console.log(error);

      res.status(500).json({

        message:
          error.message

      });

    }

  }

);


// ================= DELETE OWN FEEDBACK =================

router.delete(

  '/:id',

  protect,

  async (req, res) => {

    try {

      const feedback =
        await Feedback.findById(
          req.params.id
        );

      if (!feedback) {

        return res.status(404).json({

          message:
            'Feedback not found'

        });

      }

      // OWNER ONLY

      if (

        feedback.userId.toString()

        !==

        req.user._id.toString()

      ) {

        return res.status(401).json({

          message:
            'Not authorized'

        });

      }

      await feedback.deleteOne();

      res.json({

        message:
          'Feedback deleted'

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        message:
          error.message

      });

    }

  }

);

module.exports = router;