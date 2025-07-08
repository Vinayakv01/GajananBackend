const Joi = require('joi');

const getConceptsSchema = Joi.object({
  searchText: Joi.string().allow('').max(250).default(''),
  start: Joi.number().integer().min(1).default(1),
  length: Joi.number().integer().min(1).default(10),
});

const createConceptSchema = Joi.object({
  Name: Joi.string().min(1).max(100).required(),
  CreatedBy: Joi.number().integer().positive().required(),
});

const updateConceptSchema = Joi.object({
  Id: Joi.number().integer().positive().required(),
  Name: Joi.string().min(1).max(100).required(),
  ModifiedBy: Joi.number().integer().positive().required(),
});

const deleteConceptSchema = Joi.object({
  Id: Joi.number().integer().positive().required(),
  ModifiedBy: Joi.number().integer().positive().required(),
});

module.exports = {
  getConceptsSchema,
  createConceptSchema,
  updateConceptSchema,
  deleteConceptSchema
};