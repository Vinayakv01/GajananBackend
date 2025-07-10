const { poolPromise } = require('../../config/db');
const sql = require('mssql');

async function getAllUnits({ searchText, start, length }) {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('SearchText', sql.NVarChar(250), searchText)
      .input('Start', sql.Int, start)
      .input('Length', sql.Int, length)
      .execute('mst.usp_GetUnit');
    return result.recordset;
  } catch (error) {
    throw new Error(`Database error in getAllUnits: ${error.message}`);
  }
}

async function getUnitById(id) {
  try {
    const pool = await poolPromise;
    const request = pool.request()
      .input('Id', sql.Int, id)
      .output('Status', sql.Bit)
      .output('Message', sql.NVarChar(200));
    const result = await request.execute('mst.usp_GetUnitById');
    return { recordset: result.recordset, output: result.output };
  } catch (error) {
    throw new Error(`Database error in getUnitById: ${error.message}`);
  }
}

async function insertUnit(data) {
  try {
    const pool = await poolPromise;
    const request = pool.request()
      .input('Name', sql.NVarChar(100), data.Name)
      .input('CreatedBy', sql.Int, data.CreatedBy)
      .output('Status', sql.Bit)
      .output('Id', sql.Int)
      .output('Message', sql.NVarChar(200));
    const result = await request.execute('mst.usp_CreateUnit');
    return { recordset: result.recordset, output: result.output };
  } catch (error) {
    throw new Error(`Database error in insertUnit: ${error.message}`);
  }
}

async function updateUnit(data) {
  try {
    const pool = await poolPromise;
    const request = pool.request()
      .input('Id', sql.Int, data.Id)
      .input('Name', sql.NVarChar(100), data.Name)
      .input('ModifiedBy', sql.Int, data.ModifiedBy)
      .output('Status', sql.Bit)
      .output('Message', sql.NVarChar(200));
    const result = await request.execute('mst.usp_UpdateUnitById');
    return { recordset: result.recordset, output: result.output };
  } catch (error) {
    throw new Error(`Database error in updateUnit: ${error.message}`);
  }
}

async function deleteUnit(id, modifiedBy) {
  try {
    const pool = await poolPromise;
    const request = pool.request()
      .input('Id', sql.Int, id)
      .input('ModifiedBy', sql.Int, modifiedBy)
      .output('Status', sql.Bit)
      .output('Message', sql.NVarChar(200));
    const result = await request.execute('mst.usp_DeleteUnitById');
    return { recordset: result.recordset, output: result.output };
  } catch (error) {
    throw new Error(`Database error in deleteUnit: ${error.message}`);
  }
}

module.exports = {
  getAllUnits,
  getUnitById,
  insertUnit,
  updateUnit,
  deleteUnit
};