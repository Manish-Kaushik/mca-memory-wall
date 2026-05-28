const express = require('express');

const router = express.Router();

const multer = require('multer');

const cloudinary =
  require('cloudinary').v2;

const Memory =
  require('../models/Memories');

const {
  protect
} = require('../middleware/authMiddleware');

cloudinary.config({

  cloud_name:
    process.env.CLOUDINARY_CLOUD_NAME,

  api_key:
    process.env.CLOUDINARY_API_KEY,

  api_secret:
    process.env.CLOUDINARY_API_SECRET

});

const storage =
  multer.memoryStorage();

const upload =
  multer({ storage });


// ================= CREATE MEMORY =================

router.post(
  '/',
  protect,
  upload.single('image'),

  async (req, res) => {

    try {

      let result;

      if (req.file) {

        result =
          await new Promise(
            (resolve, reject) => {

              cloudinary.uploader.upload_stream(

                {
                  resource_type: 'image',
                  folder: 'mca_memories'
                },

                (error, result) => {

                  if (error) {

                    reject(error);

                  } else {

                    resolve(result);

                  }

                }

              ).end(req.file.buffer);

            }
          );

      }

      const memory =
        await Memory.create({

          userId:
            req.user._id,

          image:
            result?.secure_url || '',

          message:
            req.body.message,

          category:
            req.body.category,

          reactions: {

            love: [],

            fire: [],

            funny: [],

            sad: []

          }

        });

      res.status(201).json(memory);

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: error.message
      });

    }

  }
);


// ================= GET MEMORIES =================

router.get('/', async (req, res) => {

  try {

    const memories =
      await Memory.find()

        .populate(
          'userId',
          'name profileImage phone linkedin instagram github'
        )

        .sort({
          createdAt: -1
        });

    // REMOVE DELETED USERS

    const filtered =
      memories.filter(
        m => m.userId !== null
      );

    res.json(filtered);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});


// ================= REACT MEMORY =================

router.put(
  '/react/:id',
  protect,

  async (req, res) => {

    try {

      const memory =
        await Memory.findById(
          req.params.id
        );

      if (!memory) {

        return res.status(404).json({
          message: 'Memory not found'
        });

      }

      const type =
        req.body.type;

      // VALID REACTION TYPES

      const validTypes = [
        'love',
        'fire',
        'funny',
        'sad'
      ];

      if (
        !validTypes.includes(type)
      ) {

        return res.status(400).json({
          message: 'Invalid reaction type'
        });

      }

      const userId =
        req.user._id.toString();

      // CHECK ALREADY REACTED

      const alreadyReacted =
        memory.reactions[type]
          .map(id => id.toString())
          .includes(userId);

      // TOGGLE REACTION

      if (alreadyReacted) {

        memory.reactions[type] =
          memory.reactions[type]
            .filter(
              id =>
                id.toString() !== userId
            );

      } else {

        memory.reactions[type]
          .push(userId);

      }

      await memory.save();

      res.json(memory);

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: error.message
      });

    }

  }
);


// ================= DELETE MEMORY =================

router.delete(
  '/:id',
  protect,

  async (req, res) => {

    try {

      const memory =
        await Memory.findById(
          req.params.id
        );

      if (!memory) {

        return res.status(404).json({
          message: 'Not found'
        });

      }

      if (

        memory.userId.toString()
        ===
        req.user._id.toString()

        ||

        req.user.role === 'admin'

      ) {

        // DELETE IMAGE FROM CLOUDINARY

        if (memory.image) {

          const parts =
            memory.image.split('/');

          const fileName =
            parts[
              parts.length - 1
            ];

          const publicId =
            'mca_memories/' +
            fileName.split('.')[0];

          await cloudinary.uploader.destroy(
            publicId
          );

        }

        // DELETE MEMORY

        await memory.deleteOne();

        res.json({
          message: 'Removed'
        });

      } else {

        res.status(401).json({
          message: 'Not authorized'
        });

      }

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: error.message
      });

    }

  }
);

module.exports = router;