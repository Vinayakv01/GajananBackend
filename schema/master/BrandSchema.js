const Joi = require('joi');

const getBrandsSchema = Joi.object({
  searchText: Joi.string().allow('').max(250).default(''),
  start: Joi.number().integer().min(1).default(1),
  length: Joi.number().integer().min(1).default(10),
});

const createBrandSchema = Joi.object({
  Name: Joi.string().min(1).max(100).required(),
  CreatedBy: Joi.number().integer().positive().required(),
});

const updateBrandSchema = Joi.object({
  Id: Joi.number().integer().positive().required(),
  Name: Joi.string().min(1).max(100).required(),
  ModifiedBy: Joi.number().integer().positive().required(),
});

module.exports = {
  getBrandsSchema,
  createBrandSchema,
  updateBrandSchema
};