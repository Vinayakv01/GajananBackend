const Joi = require('joi');

const getProductImagesSchema = Joi.object({
  searchText: Joi.string().allow('').max(250).default(''),
  start: Joi.number().integer().min(1).default(1),
  length: Joi.number().integer().min(1).default(10),
});

const createProductImageSchema = Joi.object({
  ProductId: Joi.number().integer().positive().required(),
  FileName: Joi.string().min(1).max(255).required(),
  Extension: Joi.string().min(1).max(10).required(),
  ContentType: Joi.string().min(1).max(100).required(),
  CreatedBy: Joi.number().integer().positive().required(),
});

const deleteProductImageSchema = Joi.object({
  Id: Joi.number().integer().positive().required(),
  ModifiedBy: Joi.number().integer().positive().required(),
});

module.exports = {
  getProductImagesSchema,
  createProductImageSchema,
  deleteProductImageSchema
};