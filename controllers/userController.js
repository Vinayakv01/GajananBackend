const UserModel = require('../models/userModel');

const getUsers = async (req, res) => {
  try {
    const users = await UserModel.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users', error: error.message });
  }
};

const createUser = async (req, res) => {
  const user = req.body;

  if (!user.FirstName || !user.MobileNumber) {
    return res.status(400).json({ message: 'FirstName and MobileNumber are required' });
  }

  try {
    const result = await UserModel.createUser(user);
    res.status(201).json({ message: 'User created successfully', result });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create user', error: error.message });
  }
};

module.exports = {
  getUsers,
  createUser
};
