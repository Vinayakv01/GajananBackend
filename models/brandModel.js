const { poolPromise } = require('../config/db');

async function getAllBrands() {
  const pool = await poolPromise;
  const result = await pool.request().execute('GetAllBrands');
  return result.recordset;
}

async function insertBrand(data) {
  const pool = await poolPromise;
  return await pool.request()
    .input('Name', data.Name)
    .input('CreatedBy', data.CreatedBy)
    .execute('InsertBrand');
}

async function updateBrand(data) {
  const pool = await poolPromise;
  return await pool.request()
    .input('Id', data.Id)
    .input('Name', data.Name)
    .input('ModifiedBy', data.ModifiedBy)
    .execute('UpdateBrand');
}

async function deleteBrand(id) {
  const pool = await poolPromise;
  return await pool.request()
    .input('Id', id)
    .execute('DeleteBrand');
}

module.exports = {
  getAllBrands,
  insertBrand,
  updateBrand,
  deleteBrand
};
