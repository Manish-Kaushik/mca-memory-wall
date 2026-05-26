const express = require('express');

const router = express.Router();

const User =
  require('../models/User');

const Memory =
  require('../models/Memories');

const {
  protect
} = require('../middleware/authMiddleware');


// ================= ADMIN MIDDLEWARE =================

const adminOnly =
(req, res, next) => {

  if (
    req.user &&
    req.user.role === 'admin'
  ) {

    next();

  } else {

    res.status(401).json({
      message:
        'Admin only'
    });

  }

};


// ================= DASHBOARD STATS =================

router.get(
  '/stats',

  protect,
  adminOnly,

  async (req, res) => {

    try {

      const totalUsers =
        await User.countDocuments();

      const totalMemories =
        await Memory.countDocuments();

      const latestUsers =
        await User.find()

          .sort({
            createdAt: -1
          })

          .limit(5);

      const latestMemories =
        await Memory.find()

          .populate(
            'userId',
            'name profileImage'
          )

          .sort({
            createdAt: -1
          })

          .limit(5);

      res.json({

        totalUsers,

        totalMemories,

        latestUsers,

        latestMemories

      });

    } catch (error) {

      res.status(500).json({
        message:
          error.message
      });

    }

  }
);


// ================= GET ALL USERS =================

router.get(
  '/users',

  protect,
  adminOnly,

  async (req, res) => {

    try {

      const users =
        await User.find()

          .sort({
            createdAt: -1
          });

      res.json(users);

    } catch (error) {

      res.status(500).json({
        message:
          error.message
      });

    }

  }
);


// ================= GET ALL MEMORIES =================

router.get(
  '/memories',

  protect,
  adminOnly,

  async (req, res) => {

    try {

      const memories =
        await Memory.find()

          .populate(
            'userId',
            'name profileImage'
          )

          .sort({
            createdAt: -1
          });

      res.json(memories);

    } catch (error) {

      res.status(500).json({
        message:
          error.message
      });

    }

  }
);


// ================= DELETE USER =================

router.delete(
  '/user/:id',

  protect,
  adminOnly,

  async (req, res) => {

    try {

      await Memory.deleteMany({
        userId:
          req.params.id
      });

      await User.findByIdAndDelete(
        req.params.id
      );

      res.json({
        message:
          'User deleted'
      });

    } catch (error) {

      res.status(500).json({
        message:
          error.message
      });

    }

  }
);


// ================= DELETE MEMORY =================

router.delete(
  '/memory/:id',

  protect,
  adminOnly,

  async (req, res) => {

    try {

      await Memory.findByIdAndDelete(
        req.params.id
      );

      res.json({
        message:
          'Memory deleted'
      });

    } catch (error) {

      res.status(500).json({
        message:
          error.message
      });

    }

  }
);

module.exports = router;