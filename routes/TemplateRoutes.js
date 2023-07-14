import express from 'express';
import Template from '../models/TemplateModel.js';

const router = express.Router();

// Route GET '/users'
router.get('/', async (req, res) => {
  try {
    const templates = await Template.find();
    res.json(templates);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

export default router;