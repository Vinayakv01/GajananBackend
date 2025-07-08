const Joi = require('joi');

const getFinishTypesSchema = Joi.object({
  searchText: Joi.string().allow('').max(250).default(''),
  start: Joi.number().integer().min(1).default(1),
  length: Joi.number().integer().min(1).default(10),
});

const createFinishTypeSchema = Joi.object({
  Name: Joi.string().min(1).max(100).required(),
  CreatedBy: Joi.number().integer().positive().required(),
});

const updateFinishTypeSchema = Joi.object({
  Id: Joi.number().integer().positive().required(),
  Name: Joi.string().min(1).max(100).required(),
  ModifiedBy: Joi.number().integer().positive().required(),
});

const deleteFinishTypeSchema = Joi.object({
  Id: Joi.number().integer().positive().required(),
  ModifiedBy: Joi.number().integer().positive().required(),
});

module.exports = {
  getFinishTypesSchema,
  createFinishTypeSchema,
  updateFinishTypeSchema,
  deleteFinishTypeSchema
};