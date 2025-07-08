const CompanyModel = require('../../models/master/CompanyModel');
const { getCompaniesSchema, createCompanySchema, deleteCompanySchema } = require('../../schema/master/CompanySchema');
const Joi = require('joi');

const getCompanies = async (req, res) => {
  try {
    const { error, value } = getCompaniesSchema.validate(req.query);
    if (error) {
      return res.status(400).json({ message: 'Invalid query parameters', error: error.details });
    }
    const companies = await CompanyModel.getAllCompanies(value);
    const totalCount = companies.length > 0 ? companies[0].TotalCount : 0;
    res.status(200).json({ data: companies, totalCount });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching companies', error: err.message });
  }
};

const createCompany = async (req, res) => {
  try {
    const { error, value } = createCompanySchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: 'Invalid input', error: error.details });
    }
    const result = await CompanyModel.insertCompany(value);
    if (result.output.Status) {
      res.status(201).json({ message: 'Company created successfully', id: result.output.Id });
    } else {
      res.status(400).json({ message: result.output.Message || 'Failed to create company' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error creating company', error: err.message });
  }
};

const deleteCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const { ModifiedBy } = req.body;
    const { error } = deleteCompanySchema.validate({ Id: parseInt(id), ModifiedBy });
    if (error) {
      return res.status(400).json({ message: 'Invalid input', error: error.details });
    }
    const result = await CompanyModel.deleteCompany(parseInt(id), ModifiedBy);
    if (result.output.Status) {
      res.status(200).json({ message: 'Company deleted (soft) successfully' });
    } else {
      res.status(400).json({ message: result.output.Message || 'Failed to delete company' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error deleting company', error: err.message });
  }
};

module.exports = {
  getCompanies,
  createCompany,
  deleteCompany
};