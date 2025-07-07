const { poolPromise } = require('../../config/db');
const sql = require('mssql');

async function getAllBrands({ searchText, start, length }) {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('SearchText', sql.NVarChar(250), searchText)
      .input('Start', sql.Int, start)
      .input('Length', sql.Int, length)
      .execute('mst.usp_Get Fro');
    return result.recordset;
  } catch (error) {
    throw new Error(`Database error in getAllBrands: ${error.message}`);
  }
}

async function insertBrand(data) {
  try {
    const pool = await poolPromise;
    const request = pool.request()
      .input('Name', sql.NVarChar(100), data.Name)
      .input('CreatedBy', sql.Int, data.CreatedBy)
      .output('Status', sql.Bit)
      .output('Id', sql.Int)
      .output('Message', sql.NVarChar(200));
    const result = await request.execute('mst.usp_CreateBrand');
    return { recordset: result.recordset, output: result.output };
  } catch (error) {
    throw new Error(`Database error in insertBrand: ${error.message}`);
  }
}

async function updateBrand(data) {
  try {
    const pool = await poolPromise;
    const request = pool.request()
      .input('Id', sql.Int, data.Id)
      .input('Name', sql.NVarChar(100), data.Name)
      .input('ModifiedBy', sql.Int, data.ModifiedBy)
      .output('Status', sql.Bit)
      .output('Message', sql.NVarChar(200));
    const result = await request.execute('mst.usp_UpdateBrand');
    return { recordset: result.recordset, output: result.output };
  } catch (error) {
    throw new Error(`Database error in updateBrand: ${error.message}`);
  }
}

async function deleteBrand(id) {
  try {
    const pool = await poolPromise;
    const request = pool.request()
      .input('Id', sql.Int, id)
      .output('Status', sql.Bit)
      .output('Message', sql.NVarChar(200));
    const result = await request.execute('mst.usp_DeleteBrand');
    return { recordset: result.recordset, output: result.output };
  } catch (error) {
    throw new Error(`Database error in deleteBrand: ${error.message}`);
  }
}

module.exports = { getAllBrands, insertBrand, updateBrand, deleteBrand };