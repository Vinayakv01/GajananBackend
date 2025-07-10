const Joi = require('joi');

const getProductsSchema = Joi.object({
  searchText: Joi.string().allow('').max(250).default(''),
  start: Joi.number().integer().min(1).default(1),
  length: Joi.number().integer().min(1).default(10),
});

const getProductByIdSchema = Joi.object({
  Id: Joi.number().integer().positive().required(),
});

const createProductSchema = Joi.object({
  BrandId: Joi.number().integer().positive().required(),
  CategoryId: Joi.number().integer().positive().required(),
  CompanyId: Joi.number().integer().positive().required(),
  ConceptId: Joi.number().integer().positive().required(),
  FinishTypeId: Joi.number().integer().positive().required(),
  ItemStatusId: Joi.number().integer().positive().required(),
  ManufacturerId: Joi.number().integer().positive().required(),
  ProductImageId: Joi.number().integer().positive().required(),
  SizeId: Joi.number().integer().positive().required(),
  UnitId: Joi.number().integer().positive().required(),
  UserId: Joi.number().integer().positive().required(),
  Weight: Joi.number().precision(2).required(),
  MinimumStockQty: Joi.number().integer().min(0).required(),
  PcsPerBox: Joi.number().integer().min(1).required(),
  CreatedBy: Joi.number().integer().positive().required(),
});

const updateProductSchema = Joi.object({
  Id: Joi.number().integer().positive().required(),
  BrandId: Joi.number().integer().positive().required(),
  CategoryId: Joi.number().integer().positive().required(),
  CompanyId: Joi.number().integer().positive().required(),
  ConceptId: Joi.number().integer().positive().required(),
  FinishTypeId: Joi.number().integer().positive().required(),
  ItemStatusId: Joi.number().integer().positive().required(),
  ManufacturerId: Joi.number().integer().positive().required(),
  ProductImageId: Joi.number().integer().positive().required(),
  SizeId: Joi.number().integer().positive().required(),
  UnitId: Joi.number().integer().positive().required(),
  UserId: Joi.number().integer().positive().required(),
  Weight: Joi.number().precision(2).required(),
  MinimumStockQty: Joi.number().integer().min(0).required(),
  PcsPerBox: Joi.number().integer().min(1).required(),
  ModifiedBy: Joi.number().integer().positive().required(),
});

const deleteProductSchema = Joi.object({
  Id: Joi.number().integer().positive().required(),
  ModifiedBy: Joi.number().integer().positive().required(),
});

module.exports = {
  getProductsSchema,
  getProductByIdSchema,
  createProductSchema,
  updateProductSchema,
  deleteProductSchema
};