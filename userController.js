const prisma = require('../db/prismaClient');

// CREATE
const createUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    const newUser = await prisma.user.create({
      data: { name, email }
    });
    return res.status(201).json({
      message: "User created successfully!",
      user: newUser
    });
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(409).json({ error: 'Yeh email pehle se exist karta hai' });
    }
    return res.status(500).json({ error: error.message });
  }
};

// READ ALL
const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    return res.status(200).json({ users });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// READ ONE
const getUserById = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(req.params.id) }
    });
    if (!user) return res.status(404).json({ error: 'User nahi mila' });
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// UPDATE
const updateUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    const updatedUser = await prisma.user.update({
      where: { id: parseInt(req.params.id) },
      data: { name, email }
    });
    return res.status(200).json({ message: 'User updated!', user: updatedUser });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'User nahi mila' });
    }
    return res.status(500).json({ error: error.message });
  }
};

// DELETE
const deleteUser = async (req, res) => {
  try {
    await prisma.user.delete({
      where: { id: parseInt(req.params.id) }
    });
    return res.status(200).json({ message: 'User deleted!' });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'User nahi mila' });
    }
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { createUser, getAllUsers, getUserById, updateUser, deleteUser };