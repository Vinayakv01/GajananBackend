const Joi = require('joi');

const getSizesSchema = Joi.object({
  searchText: Joi.string().allow('').max(250).default(''),
  start: Joi.number().integer().min(1).default(1),
  length: Joi.number().integer().min(1).default(10),
});

const createSizeSchema = Joi.object({
  Name: Joi.string().min(1).max(100).required(),
  PiecePerBox: Joi.number().integer().min(1).required(),
  WeightPerBox: Joi.number().precision(2).min(0).required(),
  DimensionInMM: Joi.string().min(1).max(50).required(),
  SquareFeet: Joi.number().precision(2).min(0).required(),
  SquareMeter: Joi.number().precision(2).min(0).required(),
  CreatedBy: Joi.number().integer().positive().required(),
});

const updateSizeSchema = Joi.object({
  Id: Joi.number().integer().positive().required(),
  Name: Joi.string().min(1).max(100).required(),
  PiecePerBox: Joi.number().integer().min(1).required(),
  WeightPerBox: Joi.number().precision(2).min(0).required(),
  DimensionInMM: Joi.string().min(1).max(50).required(),
  SquareFeet: Joi.number().precision(2).min(0).required(),
  SquareMeter: Joi.number().precision(2).min(0).required(),
  ModifiedBy: Joi.number().integer().positive().required(),
});

const deleteSizeSchema = Joi.object({
  Id: Joi.number().integer().positive().required(),
  ModifiedBy: Joi.number().integer().positive().required(),
});

module.exports = {
  getSizesSchema,
  createSizeSchema,
  updateSizeSchema,
  deleteSizeSchema
};