const Joi = require('joi');

const getCompaniesSchema = Joi.object({
  searchText: Joi.string().allow('').max(250).default(''),
  start: Joi.number().integer().min(1).default(1),
  length: Joi.number().integer().min(1).default(10),
});

const createCompanySchema = Joi.object({
  CompanyName: Joi.string().min(1).max(100).required(),
  GST: Joi.string().max(15).allow(null, ''),
  Address: Joi.string().max(200).allow(null, ''),
  CompanyCode: Joi.string().min(1).max(10).required(),
  CreatedBy: Joi.number().integer().positive().required(),
});

const deleteCompanySchema = Joi.object({
  Id: Joi.number().integer().positive().required(),
  ModifiedBy: Joi.number().integer().positive().required(),
});

module.exports = {
  getCompaniesSchema,
  createCompanySchema,
  deleteCompanySchema
};