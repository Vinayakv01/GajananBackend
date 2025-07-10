const { poolPromise } = require('../../config/db');
const sql = require('mssql');

async function getAllSizes({ searchText, start, length }) {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('SearchText', sql.NVarChar(250), searchText)
      .input('Start', sql.Int, start)
      .input('Length', sql.Int, length)
      .execute('mst.usp_GetSize');
    return result.recordset;
  } catch (error) {
    throw new Error(`Database error in getAllSizes: ${error.message}`);
  }
}

async function insertSize(data) {
  try {
    const pool = await poolPromise;
    const request = pool.request()
      .input('Name', sql.NVarChar(100), data.Name)
      .input('PiecePerBox', sql.Int, data.PiecePerBox)
      .input('WeightPerBox', sql.Decimal(18, 2), data.WeightPerBox)
      .input('DimensionInMM', sql.VarChar(50), data.DimensionInMM)
      .input('SquareFeet', sql.Decimal(18, 2), data.SquareFeet)
      .input('SquareMeter', sql.Decimal(18, 2), data.SquareMeter)
      .input('CreatedBy', sql.Int, data.CreatedBy)
      .output('Status', sql.Bit)
      .output('Id', sql.Int)
      .output('Message', sql.NVarChar(200));
    const result = await request.execute('mst.usp_CreateSize');
    return { recordset: result.recordset, output: result.output };
  } catch (error) {
    throw new Error(`Database error in insertSize: ${error.message}`);
  }
}

async function updateSize(data) {
  try {
    const pool = await poolPromise;
    const request = pool.request()
      .input('Id', sql.Int, data.Id)
      .input('Name', sql.NVarChar(100), data.Name)
      .input('PiecePerBox', sql.Int, data.PiecePerBox)
      .input('WeightPerBox', sql.Decimal(18, 2), data.WeightPerBox)
      .input('DimensionInMM', sql.VarChar(50), data.DimensionInMM)
      .input('SquareFeet', sql.Decimal(18, 2), data.SquareFeet)
      .input('SquareMeter', sql.Decimal(18, 2), data.SquareMeter)
      .input('ModifiedBy', sql.Int, data.ModifiedBy)
      .output('Status', sql.Bit)
      .output('Message', sql.NVarChar(200));
    const result = await request.execute('mst.usp_UpdateSizeById');
    return { recordset: result.recordset, output: result.output };
  } catch (error) {
    throw new Error(`Database error in updateSize: ${error.message}`);
  }
}

async function deleteSize(id, modifiedBy) {
  try {
    const pool = await poolPromise;
    const request = pool.request()
      .input('Id', sql.Int, id)
      .input('ModifiedBy', sql.Int, modifiedBy)
      .output('Status', sql.Bit)
      .output('Message', sql.NVarChar(200));
    const result = await request.execute('mst.usp_DeleteSizeById');
    return { recordset: result.recordset, output: result.output };
  } catch (error) {
    throw new Error(`Database error in deleteSize: ${error.message}`);
  }
}

module.exports = {
  getAllSizes,
  insertSize,
  updateSize,
  deleteSize
};