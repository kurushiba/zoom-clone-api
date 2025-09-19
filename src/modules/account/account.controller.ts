import express from 'express';
import { User } from '../users/user.entity';
import { Auth } from '../../lib/auth';
import datasource from '../../datasource';

const accountController = express.Router();
const userRepository = datasource.getRepository(User);

accountController.put('/profile', Auth, async (req, res) => {
  try {
    const userId = req.currentUser.id;
    const { name } = req.body;

    if (!name || name.trim() === '') {
      return res.status(400).json({ message: 'Name is required' });
    }

    const existingUser = await userRepository.findOne({
      where: { id: userId },
    });
    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    existingUser.name = name.trim();
    await userRepository.save(existingUser);

    res.json(existingUser);
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export { accountController };
