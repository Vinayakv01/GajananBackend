const { poolPromise } = require('../../config/db');
const sql = require('mssql');

async function insertUser(data) {
  try {
    const pool = await poolPromise;
    const request = pool.request()
      .input('FirstName', sql.NVarChar(100), data.FirstName)
      .input('LastName', sql.NVarChar(100), data.LastName)
      .input('MobileNumber', sql.NVarChar(15), data.MobileNumber)
      .input('Password', sql.NVarChar(100), data.Password)
      .input('CreatedBy', sql.Int, data.CreatedBy)
      .output('Status', sql.Bit)
      .output('Id', sql.Int)
      .output('Message', sql.NVarChar(200));
    const result = await request.execute('mst.usp_CreateUser');
    return { recordset: result.recordset, output: result.output };
  } catch (error) {
    throw new Error(`Database error in insertUser: ${error.message}`);
  }
}

async function validateUser(data) {
  try {
    const pool = await poolPromise;
    const request = pool.request()
      .input('MobileNumber', sql.NVarChar(15), data.MobileNumber)
      .input('Password', sql.NVarChar(100), data.Password)
      .output('Status', sql.Bit)
      .output('Message', sql.NVarChar(200));
    const result = await request.execute('mst.usp_ValidateUser');
    return { recordset: result.recordset, output: result.output };
  } catch (error) {
    throw new Error(`Database error in validateUser: ${error.message}`);
  }
}

module.exports = { insertUser, validateUser };