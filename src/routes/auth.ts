import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';

const router = express.Router();

// register interface
router.post('/register', async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phone,
      gender,
      height,
      age,
      address,
      city,
      state,
      postalCode,
      country,
    } = req.body;

    // 1. check if user already exists
    const existingEmail = await User.findOne({ email });
    const existingPhone = await User.findOne({ phone });

    if (existingEmail) {
      return res.status(400).json({ message: '邮箱已注册' });
    }
    if (existingPhone) {
      return res.status(400).json({ message: '手机号已注册' });
    }

    // 2. encrypt password
    const passwordHash = await bcrypt.hash(password, 10);

    // 3. create new user
    const user = await User.create({
      name,
      email,
      passwordHash,
      phone,
      gender,
      height,
      age,
      address,
      city,
      state,
      postalCode,
      country,
    });

    res.status(201).json({ message: '注册成功', userId: user._id });
  } catch (err) {
    res.status(500).json({ message: '注册失败', error: err });
  }
});

// login interface
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. search for user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: '邮箱或密码错误' });
    }

    // 2. check password
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ message: '邮箱或密码错误' });
    }

    // 3. generate token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
      expiresIn: '7d',
    });

    res.json({ message: '登录成功', token });
  } catch (err) {
    res.status(500).json({ message: '登录失败', error: err });
  }
});

export default router;
