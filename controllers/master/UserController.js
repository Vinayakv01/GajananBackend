const { insertUser, validateUser } = require('../../models/master/UserModel');
const { createUserSchema, loginUserSchema } = require('../../schema/master/UserSchema');
const jwt = require('jsonwebtoken');


const createUser = async (req, res) => {
  try {
    const { error, value } = createUserSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: 'Invalid input', error: error.details });
    }
    const result = await insertUser(value);
    if (result.output.Status) {
      res.status(201).json({ message: 'User created successfully', id: result.output.Id });
    } else {
      res.status(400).json({ message: !result.output.Message ? 'Failed to create user' : result.output.Message });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error creating user', error: err.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { error, value } = loginUserSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: 'Invalid input', error: error.details });
    }
    const result = await validateUser(value);
    if (result.output.Status && result.recordset.length > 0) {
      const user = {
        id: result.recordset[0].Id,
        firstName: result.recordset[0].FirstName,
        lastName: result.recordset[0].LastName
      };
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.status(200).json({ message: 'Login successful', user, token });
    } else {
      res.status(401).json({ message: result.output.Message || 'Incorrect mobile number or password' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error during login', error: err.message });
  }
};

module.exports = {
  createUser,
  loginUser
};