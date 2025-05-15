import * as userService from '../services/userService.js';

export const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers(req.query);
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await userService.getUserById(id);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.json(user);
};

export const createUser = async (req, res) => {
  try {
    const newUser = await userService.createUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create user' });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { email, name } = req.body;

  const user = await userService.findUserById(id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  try {
    const updatedUser = await userService.updateUser(id, { email, name });
    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  const user = await userService.findUserById(id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  try {
    await userService.deleteUser(id);
    res.json({ message: 'User deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};