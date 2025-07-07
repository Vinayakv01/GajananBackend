const BrandModel = require('../../models/master/BrandModel');
const { getBrandsSchema, createBrandSchema, updateBrandSchema } = require('../../schema/master/BrandSchema');
const Joi = require('joi');

const getBrands = async (req, res) => {
  try {
    const { error, value } = getBrandsSchema.validate(req.query);
    if (error) {
      return res.status(400).json({ message: 'Invalid query parameters', error: error.details });
    }
    const brands = await BrandModel.getAllBrands(value);
    const totalCount = brands.length > 0 ? brands[0].TotalCount : 0;
    res.status(200).json({ data: brands, totalCount });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching brands', error: err.message });
  }
};

const createBrand = async (req, res) => {
  try {
    const { error, value } = createBrandSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: 'Invalid input', error: error.details });
    }
    const result = await BrandModel.insertBrand(value);
    if (result.output.Status) {
      res.status(201).json({ message: 'Brand created successfully', id: result.output.Id });
    } else {
      res.status(400).json({ message: result.output.Message || 'Failed to create brand' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error creating brand', error: err.message });
  }
};

const updateBrand = async (req, res) => {
  try {
    const { id } = req.params;
    const { Name, ModifiedBy } = req.body;
    const { error, value } = updateBrandSchema.validate({ Id: parseInt(id), Name, ModifiedBy });
    if (error) {
      return res.status(400).json({ message: 'Invalid input', error: error.details });
    }
    const result = await BrandModel.updateBrand(value);
    if (result.output.Status) {
      res.status(200).json({ message: 'Brand updated successfully' });
    } else {
      res.status(400).json({ message: result.output.Message || 'Failed to update brand' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error updating brand', error: err.message });
  }
};

const deleteBrand = async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = Joi.number().integer().positive().required().validate(id);
    if (error) {
      return res.status(400).json({ message: 'Invalid brand ID', error: error.details });
    }
    const result = await BrandModel.deleteBrand(id);
    if (result.output.Status) {
      res.status(200).json({ message: 'Brand deleted (soft) successfully' });
    } else {
      res.status(400).json({ message: result.output.Message || 'Failed to delete brand' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error deleting brand', error: err.message });
  }
};

module.exports = {
  getBrands,
  createBrand,
  updateBrand,
  deleteBrand
};