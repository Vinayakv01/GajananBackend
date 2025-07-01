const { poolPromise } = require('../config/db');

async function getAllUsers() {
  try {
    const pool = await poolPromise;
    const result = await pool.request().execute('GetAllUsers');
    return result.recordset;
  } catch (err) {
    throw err;
  }
}

async function createUser(user) {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('FirstName', user.FirstName)
      .input('LastName', user.LastName)
      .input('MobileNumber', user.MobileNumber)
      .input('Password', user.Password)
      .input('CreatedBy', user.CreatedBy)
      .input('Status', user.Status)
      .execute('InsertUser');
    return result;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  getAllUsers,
  createUser
};
