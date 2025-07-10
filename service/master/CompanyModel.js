const { poolPromise } = require('../../config/db');
const sql = require('mssql');

async function getAllCompanies({ searchText, start, length }) {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('SearchText', sql.NVarChar(250), searchText)
      .input('Start', sql.Int, start)
      .input('Length', sql.Int, length)
      .execute('mst.usp_GetCompany');
    return result.recordset;
  } catch (error) {
    throw new Error(`Database error in getAllCompanies: ${error.message}`);
  }
}

async function insertCompany(data) {
  try {
    const pool = await poolPromise;
    const request = pool.request()
      .input('CompanyName', sql.NVarChar(100), data.CompanyName)
      .input('GST', sql.VarChar(15), data.GST)
      .input('Address', sql.NVarChar(200), data.Address)
      .input('CompanyCode', sql.VarChar(10), data.CompanyCode)
      .input('CreatedBy', sql.Int, data.CreatedBy)
      .output('Status', sql.Bit)
      .output('Id', sql.Int)
      .output('Message', sql.NVarChar(200));
    const result = await request.execute('mst.usp_CreateCompany');
    return { recordset: result.recordset, output: result.output };
  } catch (error) {
    throw new Error(`Database error in insertCompany: ${error.message}`);
  }
}

async function deleteCompany(id, modifiedBy) {
  try {
    const pool = await poolPromise;
    const request = pool.request()
      .input('Id', sql.Int, id)
      .input('ModifiedBy', sql.Int, modifiedBy)
      .output('Status', sql.Bit)
      .output('Message', sql.NVarChar(200));
    const result = await request.execute('mst.usp_DeleteCompany');
    return { recordset: result.recordset, output: result.output };
  } catch (error) {
    throw new Error(`Database error in deleteCompany: ${error.message}`);
  }
}

module.exports = { getAllCompanies, insertCompany, deleteCompany };