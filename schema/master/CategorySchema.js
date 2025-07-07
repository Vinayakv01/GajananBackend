const Joi = require('joi');

const getCategoriesSchema = Joi.object({
  searchText: Joi.string().allow('').max(250).default(''),
  start: Joi.number().integer().min(1).default(1),
  length: Joi.number().integer().min(1).default(10),
});

const getCategoryByIdSchema = Joi.object({
  Id: Joi.number().integer().positive().required(),
});

const createCategorySchema = Joi.object({
  Name: Joi.string().min(1).max(100).required(),
  CreatedBy: Joi.number().integer().positive().required(),
});

const updateCategorySchema = Joi.object({
  Id: Joi.number().integer().positive().required(),
  Name: Joi.string().min(1).max(100).required(),
  ModifiedBy: Joi.number().integer().positive().required(),
});

module.exports = {
  getCategoriesSchema,
  getCategoryByIdSchema,
  createCategorySchema,
  updateCategorySchema
};