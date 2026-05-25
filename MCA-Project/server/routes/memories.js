const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const Memory = require('../models/Memories');
const { protect } = require('../middleware/authMiddleware');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/', protect, upload.single('image'), async (req, res) => {
  try {

    console.log(req.file);
    console.log(req.body);

    let result;

    if (req.file) {

      result = await new Promise((resolve, reject) => {

        cloudinary.uploader.upload_stream(
          {
            resource_type: 'image',
            folder: 'mca_memories'
          },

          (error, result) => {

            if (error) {
              console.log(error);
              reject(error);
            } else {
              resolve(result);
            }

          }

        ).end(req.file.buffer);

      });

      console.log(result);

    }

    const memory = await Memory.create({
      userId: req.user._id,
      image: result?.secure_url || '',
      message: req.body.message,
      category: req.body.category
    });

    res.status(201).json(memory);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message
    });

  }
});

router.get('/', async (req, res) => {
  try {
    const memories = await Memory.find()
      .populate('userId', 'name profileImage phone linkedin instagram github')
      .sort({ createdAt: -1 });

    // ✅ NULL USER FIX
    const filtered = memories.filter(m => m.userId !== null);

    res.json(filtered);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});
router.put('/react/:id', async (req, res) => {

  try {

    const memory = await Memory.findById(req.params.id);

    if (memory) {

   if (!memory.reactions) {
  memory.reactions = { like: 0, love: 0 };
}

if (!memory.reactions[req.body.type]) {
  memory.reactions[req.body.type] = 0;
}

memory.reactions[req.body.type]++;

      await memory.save();

      res.json(memory);

    } else {

      res.status(404).json({
        message: 'Not found'
      });

    }

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});

router.delete('/:id', protect, async (req, res) => {

  const memory = await Memory.findById(req.params.id);

  if (memory) {

    if (
      memory.userId.toString() === req.user._id.toString() ||
      req.user.role === 'admin'
    ) {

      await memory.deleteOne();

      res.json({
        message: 'Removed'
      });

    } else {

      res.status(401).json({
        message: 'Not authorized'
      });

    }

  } else {

    res.status(404).json({
      message: 'Not found'
    });

  }

});

module.exports = router;
