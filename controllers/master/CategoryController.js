const CategoryModel = require('../../models/master/CategoryModel');
const { getCategoriesSchema, createCategorySchema, updateCategorySchema, getCategoryByIdSchema } = require('../../schema/master/CategorySchema');
const Joi = require('joi');

const getCategories = async (req, res) => {
  try {
    const { error, value } = getCategoriesSchema.validate(req.query);
    if (error) {
      return res.status(400).json({ message: 'Invalid query parameters', error: error.details });
    }
    const categories = await CategoryModel.getAllCategories(value);
    const totalCount = categories.length > 0 ? categories[0].TotalCount : 0;
    res.status(200).json({ data: categories, totalCount });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching categories', error: err.message });
  }
};

const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = getCategoryByIdSchema.validate({ Id: parseInt(id) });
    if (error) {
      return res.status(400).json({ message: 'Invalid category ID', error: error.details });
    }
    const result = await CategoryModel.getCategoryById(parseInt(id));
    if (result.output.Status && result.recordset.length > 0) {
      res.status(200).json({ data: result.recordset[0] });
    } else {
      res.status(404).json({ message: result.output.Message || 'Category not found or inactive' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error fetching category', error: err.message });
  }
};

const createCategory = async (req, res) => {
  try {
    const { error, value } = createCategorySchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: 'Invalid input', error: error.details });
    }
    const result = await CategoryModel.insertCategory(value);
    if (result.output.Status) {
      res.status(201).json({ message: 'Category created successfully', id: result.output.Id });
    } else {
      res.status(400).json({ message: result.output.Message || 'Failed to create category' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error creating category', error: err.message });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { Name, ModifiedBy } = req.body;
    const { error, value } = updateCategorySchema.validate({ Id: parseInt(id), Name, ModifiedBy });
    if (error) {
      return res.status(400).json({ message: 'Invalid input', error: error.details });
    }
    const result = await CategoryModel.updateCategory(value);
    if (result.output.Status) {
      res.status(200).json({ message: 'Category updated successfully' });
    } else {
      res.status(400).json({ message: result.output.Message || 'Failed to update category' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error updating category', error: err.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { ModifiedBy } = req.body;
    const idValidation = Joi.number().integer().positive().required().validate(id);
    const modifiedByValidation = Joi.number().integer().positive().required().validate(ModifiedBy);
    if (idValidation.error || modifiedByValidation.error) {
      return res.status(400).json({
        message: 'Invalid input',
        error: idValidation.error?.details || modifiedByValidation.error?.details
      });
    }
    const result = await CategoryModel.deleteCategory(parseInt(id), ModifiedBy);
    if (result.output.Status) {
      res.status(200).json({ message: 'Category deleted (soft) successfully' });
    } else {
      res.status(400).json({ message: result.output.Message || 'Failed to delete category' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error deleting category', error: err.message });
  }
};

module.exports = {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
};