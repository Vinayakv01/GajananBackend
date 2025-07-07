const Joi = require('joi');

const createUserSchema = Joi.object({
  FirstName: Joi.string().min(1).max(100).required(),
  LastName: Joi.string().min(1).max(100).allow('').optional(),
  MobileNumber: Joi.string().min(1).max(15).required(),
  Password: Joi.string().min(1).max(100).required(),
  CreatedBy: Joi.number().integer().positive().required(),
});

const loginUserSchema = Joi.object({
  MobileNumber: Joi.string().min(1).max(15).required(),
  Password: Joi.string().min(1).max(100).required(),
});

module.exports = {
  createUserSchema,
  loginUserSchema
};