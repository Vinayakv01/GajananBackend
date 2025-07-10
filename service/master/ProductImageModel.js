const { poolPromise } = require('../../config/db');
const sql = require('mssql');

async function getAllProductImages({ searchText, start, length }) {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('SearchText', sql.NVarChar(250), searchText)
      .input('Start', sql.Int, start)
      .input('Length', sql.Int, length)
      .execute('mst.usp_GetProductImage');
    return result.recordset;
  } catch (error) {
    throw new Error(`Database error in getAllProductImages: ${error.message}`);
  }
}

async function insertProductImage(data) {
  try {
    const pool = await poolPromise;
    const request = pool.request()
      .input('ProductId', sql.Int, data.ProductId)
      .input('FileName', sql.NVarChar(255), data.FileName)
      .input('Extension', sql.VarChar(10), data.Extension)
      .input('ContentType', sql.VarChar(100), data.ContentType)
      .input('CreatedBy', sql.Int, data.CreatedBy)
      .output('Status', sql.Bit)
      .output('Id', sql.Int)
      .output('Message', sql.NVarChar(200));
    const result = await request.execute('mst.usp_CreateProductImage');
    return { recordset: result.recordset, output: result.output };
  } catch (error) {
    throw new Error(`Database error in insertProductImage: ${error.message}`);
  }
}

async function deleteProductImage(id, modifiedBy) {
  try {
    const pool = await poolPromise;
    const request = pool.request()
      .input('Id', sql.Int, id)
      .input('ModifiedBy', sql.Int, modifiedBy)
      .output('Status', sql.Bit)
      .output('Message', sql.NVarChar(200));
    const result = await request.execute('mst.usp_DeleteProductImage');
    return { recordset: result.recordset, output: result.output };
  } catch (error) {
    throw new Error(`Database error in deleteProductImage: ${error.message}`);
  }
}

module.exports = {
  getAllProductImages,
  insertProductImage,
  deleteProductImage
};