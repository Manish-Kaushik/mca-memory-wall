const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Memory = require('../models/Memories');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');
const cloudinary = require('cloudinary').v2;

// 🔥 Cloudinary Config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ================= REGISTER =================
router.post('/register', async (req, res) => {
  const { name, enrollment, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        message: 'User already exists'
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      enrollment,
      email,
      password: hashedPassword,
      profileImage: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=7c3aed&color=fff`
    });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    res.status(201).json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error(error);

    if (error.code === 11000) {
      return res.status(400).json({
        message: 'Email or Enrollment already exists'
      });
    }

    res.status(500).json({
      message: error.message
    });
  }
});

// ================= LOGIN =================
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && await bcrypt.compare(password, user.password)) {

      const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '30d' }
      );

      res.json({
        token,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          avatar: user.profileImage,
          phone: user.phone,
          linkedin: user.linkedin,
          instagram: user.instagram,
          github: user.github
        }
      });

    } else {
      res.status(401).json({
        message: 'Invalid credentials'
      });
    }

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message
    });
  }
});

// ================= UPDATE PROFILE =================
router.put('/profile', protect, async (req, res) => {
  try {
    const { name, phone, linkedin, instagram, github } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        message: 'User not found'
      });
    }

    user.name = name || user.name;
    user.phone = phone || user.phone;
    user.linkedin = linkedin || user.linkedin;
    user.instagram = instagram || user.instagram;
    user.github = github || user.github;

    const updatedUser = await user.save();

    const token = jwt.sign(
      { id: updatedUser._id },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    res.json({
      token,
      user: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        avatar: updatedUser.profileImage,
        phone: updatedUser.phone,
        linkedin: updatedUser.linkedin,
        instagram: updatedUser.instagram,
        github: updatedUser.github
      }
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message
    });
  }
});

// ================= UPLOAD PROFILE PIC =================
router.put('/profile/pic', protect, upload.single('image'), async (req, res) => {
  try {

    if (!req.file) {
      return res.status(400).json({
        message: 'No image uploaded'
      });
    }

    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: 'mca_profile_pics' },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(req.file.buffer);
    });

    const user = await User.findById(req.user._id);

    user.profileImage = result.secure_url;

    await user.save();

    res.json({
      profileImage: user.profileImage
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message
    });
  }
});

// ================= ADMIN DELETE USER =================
router.delete('/users/:id', protect, async (req, res) => {

  if (req.user.role !== 'admin') {
    return res.status(403).json({
      message: 'Admin only'
    });
  }

  try {

    const userToDelete = await User.findById(req.params.id);

    if (!userToDelete) {
      return res.status(404).json({
        message: 'User not found'
      });
    }

    // Delete all memories of user
    await Memory.deleteMany({
      userId: req.params.id
    });

    // Delete user
    await User.findByIdAndDelete(req.params.id);

    res.json({
      message: 'User and associated memories deleted'
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message
    });
  }
});

module.exports = router;