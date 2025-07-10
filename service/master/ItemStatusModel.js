const { poolPromise } = require('../../config/db');
const sql = require('mssql');

async function getAllItemStatuses({ searchText, start, length }) {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('SearchText', sql.NVarChar(250), searchText)
      .input('Start', sql.Int, start)
      .input('Length', sql.Int, length)
      .execute('mst.usp_GetItemStatus');
    return result.recordset;
  } catch (error) {
    throw new Error(`Database error in getAllItemStatuses: ${error.message}`);
  }
}

module.exports = { getAllItemStatuses };