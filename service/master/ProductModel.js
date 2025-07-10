const { poolPromise } = require('../../config/db');
const sql = require('mssql');

async function getAllProducts({ searchText, start, length }) {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('SearchText', sql.NVarChar(250), searchText)
      .input('Start', sql.Int, start)
      .input('Length', sql.Int, length)
      .execute('mst.usp_GetProduct');
    return result.recordset;
  } catch (error) {
    throw new Error(`Database error in getAllProducts: ${error.message}`);
  }
}

async function getProductById(id) {
  try {
    const pool = await poolPromise;
    const request = pool.request()
      .input('Id', sql.Int, id)
      .output('Status', sql.Bit)
      .output('Message', sql.NVarChar(200));
    const result = await request.execute('mst.usp_GetProductById');
    return { recordset: result.recordset, output: result.output };
  } catch (error) {
    throw new Error(`Database error in getProductById: ${error.message}`);
  }
}

async function insertProduct(data) {
  try {
    const pool = await poolPromise;
    const request = pool.request()
      .input('BrandId', sql.Int, data.BrandId)
      .input('CategoryId', sql.Int, data.CategoryId)
      .input('CompanyId', sql.Int, data.CompanyId)
      .input('ConceptId', sql.Int, data.ConceptId)
      .input('FinishTypeId', sql.Int, data.FinishTypeId)
      .input('ItemStatusId', sql.Int, data.ItemStatusId)
      .input('ManufacturerId', sql.Int, data.ManufacturerId)
      .input('ProductImageId', sql.Int, data.ProductImageId)
      .input('SizeId', sql.Int, data.SizeId)
      .input('UnitId', sql.Int, data.UnitId)
      .input('UserId', sql.Int, data.UserId)
      .input('Weight', sql.Decimal(18, 2), data.Weight)
      .input('MinimumStockQty', sql.Int, data.MinimumStockQty)
      .input('PcsPerBox', sql.Int, data.PcsPerBox)
      .input('CreatedBy', sql.Int, data.CreatedBy)
      .output('Status', sql.Bit)
      .output('Id', sql.Int)
      .output('Message', sql.NVarChar(200));
    const result = await request.execute('mst.usp_CreateProduct');
    return { recordset: result.recordset, output: result.output };
  } catch (error) {
    throw new Error(`Database error in insertProduct: ${error.message}`);
  }
}

async function updateProduct(data) {
  try {
    const pool = await poolPromise;
    const request = pool.request()
      .input('Id', sql.Int, data.Id)
      .input('BrandId', sql.Int, data.BrandId)
      .input('CategoryId', sql.Int, data.CategoryId)
      .input('CompanyId', sql.Int, data.CompanyId)
      .input('ConceptId', sql.Int, data.ConceptId)
      .input('FinishTypeId', sql.Int, data.FinishTypeId)
      .input('ItemStatusId', sql.Int, data.ItemStatusId)
      .input('ManufacturerId', sql.Int, data.ManufacturerId)
      .input('ProductImageId', sql.Int, data.ProductImageId)
      .input('SizeId', sql.Int, data.SizeId)
      .input('UnitId', sql.Int, data.UnitId)
      .input('UserId', sql.Int, data.UserId)
      .input('Weight', sql.Decimal(18, 2), data.Weight)
      .input('MinimumStockQty', sql.Int, data.MinimumStockQty)
      .input('PcsPerBox', sql.Int, data.PcsPerBox)
      .input('ModifiedBy', sql.Int, data.ModifiedBy)
      .output('Status', sql.Bit)
      .output('Message', sql.NVarChar(200));
    const result = await request.execute('mst.usp_UpdateProductById');
    return { recordset: result.recordset, output: result.output };
  } catch (error) {
    throw new Error(`Database error in updateProduct: ${error.message}`);
  }
}

async function deleteProduct(id, modifiedBy) {
  try {
    const pool = await poolPromise;
    const request = pool.request()
      .input('Id', sql.Int, id)
      .input('ModifiedBy', sql.Int, modifiedBy)
      .output('Status', sql.Bit)
      .output('Message', sql.NVarChar(200));
    const result = await request.execute('mst.usp_DeleteProductById');
    return { recordset: result.recordset, output: result.output };
  } catch (error) {
    throw new Error(`Database error in deleteProduct: ${error.message}`);
  }
}

module.exports = {
  getAllProducts,
  getProductById,
  insertProduct,
  updateProduct,
  deleteProduct
};