const Joi = require('joi');

const getBrandsSchema = Joi.object({
  searchText: Joi.string().allow('').max(250).default(''),
  start: Joi.number().integer().min(1).default(1),
  length: Joi.number().integer().min(1).default(10),
});

const createBrandSchema = Joi.object({
  name: Joi.string().min(1).max(100).required(),
  createdBy: Joi.number().integer().positive().required(),
});

const updateBrandSchema = Joi.object({
  id: Joi.number().integer().positive().required(),
  name: Joi.string().min(1).max(100).required(),
  modifiedBy: Joi.number().integer().positive().required(),
});

module.exports = {
  getBrandsSchema,
  createBrandSchema,
  updateBrandSchema
};