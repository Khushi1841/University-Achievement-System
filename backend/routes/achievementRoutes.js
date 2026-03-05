const express = require('express');
const router = express.Router();
const Achievement = require('../models/Achievement');

// 👇 Naye Packages Import Kiye 👇
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

// ⚙️ Cloudinary ka Setup (Jo keys tumne .env mein daali hain, wo yahan use hongi)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// 📁 Multer Storage Setup (Photos kahan aur kis format mein save hongi)
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'university_achievements', // Cloudinary mein is naam ka folder ban jayega
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp']
  }
});
const upload = multer({ storage: storage });

// -------------------------------------------------------------------
// POST Route: Naya achievement + PHOTO add karne ke liye
// 'upload.single("photo")' middleware image ko pakad kar cloud par bhej dega
// -------------------------------------------------------------------
router.post('/add', upload.single('photo'), async (req, res) => {
  try {
    // Agar photo upload hui hai, toh Cloudinary jo secure link dega wo hum photoUrl mein daal denge
    const photoUrl = req.file ? req.file.path : "";

    // Naya data banaya (User ka data + Cloudinary ka Photo Link)
    const newAchievement = new Achievement({
      ...req.body,
      photo: photoUrl
    });

    const savedAchievement = await newAchievement.save();
    res.status(201).json({ message: "🎉 Achievement with Photo added successfully!", data: savedAchievement });
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ message: "❌ Error saving achievement", error: error.message });
  }
});

// -------------------------------------------------------------------
// GET Route: Saare achievements dekhne ke liye (Yeh same purana wala hai)
// -------------------------------------------------------------------
router.get('/all', async (req, res) => {
  try {
    const achievements = await Achievement.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: achievements.length, data: achievements });
  } catch (error) {
    res.status(500).json({ success: false, message: "❌ Error fetching achievements", error: error.message });
  }
});

// -------------------------------------------------------------------
// DELETE Route: Galat entry ko delete karne ke liye
// -------------------------------------------------------------------
router.delete('/delete/:id', async (req, res) => {
  try {
    await Achievement.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "🗑️ Achievement Deleted Successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, message: "❌ Error deleting achievement" });
  }
});

module.exports = router;