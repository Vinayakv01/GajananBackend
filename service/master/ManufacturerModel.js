const { poolPromise } = require('../../config/db');
const sql = require('mssql');

async function getAllManufacturers({ searchText, start, length }) {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('SearchText', sql.NVarChar(250), searchText)
      .input('Start', sql.Int, start)
      .input('Length', sql.Int, length)
      .execute('mst.usp_GetManufacturer');
    return result.recordset;
  } catch (error) {
    throw new Error(`Database error in getAllManufacturers: ${error.message}`);
  }
}

async function insertManufacturer(data) {
  try {
    const pool = await poolPromise;
    const request = pool.request()
      .input('Name', sql.NVarChar(100), data.Name)
      .input('CreatedBy', sql.Int, data.CreatedBy)
      .output('Status', sql.Bit)
      .output('Id', sql.Int)
      .output('Message', sql.NVarChar(200));
    const result = await request.execute('mst.usp_CreateManufacturer');
    return { recordset: result.recordset, output: result.output };
  } catch (error) {
    throw new Error(`Database error in insertManufacturer: ${error.message}`);
  }
}

async function updateManufacturer(data) {
  try {
    const pool = await poolPromise;
    const request = pool.request()
      .input('Id', sql.Int, data.Id)
      .input('Name', sql.NVarChar(100), data.Name)
      .input('ModifiedBy', sql.Int, data.ModifiedBy)
      .output('Status', sql.Bit)
      .output('Message', sql.NVarChar(200));
    const result = await request.execute('mst.usp_UpdateManufacturerById');
    return { recordset: result.recordset, output: result.output };
  } catch (error) {
    throw new Error(`Database error in updateManufacturer: ${error.message}`);
  }
}

async function deleteManufacturer(id, modifiedBy) {
  try {
    const pool = await poolPromise;
    const request = pool.request()
      .input('Id', sql.Int, id)
      .input('ModifiedBy', sql.Int, modifiedBy)
      .output('Status', sql.Bit)
      .output('Message', sql.NVarChar(200));
    const result = await request.execute('mst.usp_DeleteManufacturerById');
    return { recordset: result.recordset, output: result.output };
  } catch (error) {
    throw new Error(`Database error in deleteManufacturer: ${error.message}`);
  }
}

module.exports = { getAllManufacturers, insertManufacturer, updateManufacturer, deleteManufacturer };