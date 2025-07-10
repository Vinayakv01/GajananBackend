const SizeModel = require('../../models/master/SizeModel');
const { getSizesSchema, createSizeSchema, updateSizeSchema, deleteSizeSchema } = require('../../schema/master/SizeSchema');
const Joi = require('joi');

const getSizes = async (req, res) => {
  try {
    const { error, value } = getSizesSchema.validate(req.query);
    if (error) {
      return res.status(400).json({ message: 'Invalid query parameters', error: error.details });
    }
    const sizes = await SizeModel.getAllSizes(value);
    const totalCount = sizes.length > 0 ? sizes[0].TotalCount : 0;
    res.status(200).json({ data: sizes, totalCount });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching sizes', error: err.message });
  }
};

const createSize = async (req, res) => {
  try {
    const { error, value } = createSizeSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: 'Invalid input', error: error.details });
    }
    const result = await SizeModel.insertSize(value);
    if (result.output.Status) {
      res.status(201).json({ message: 'Size created successfully', id: result.output.Id });
    } else {
      res.status(400).json({ message: result.output.Message || 'Failed to create size' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error creating size', error: err.message });
  }
};

const updateSize = async (req, res) => {
  try {
    const { id } = req.params;
    const { error, value } = updateSizeSchema.validate({ Id: parseInt(id), ...req.body });
    if (error) {
      return res.status(400).json({ message: 'Invalid input', error: error.details });
    }
    const result = await SizeModel.updateSize(value);
    if (result.output.Status) {
      res.status(200).json({ message: 'Size updated successfully' });
    } else {
      res.status(400).json({ message: result.output.Message || 'Failed to update size' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error updating size', error: err.message });
  }
};

const deleteSize = async (req, res) => {
  try {
    const { id } = req.params;
    const { ModifiedBy } = req.body;
    const { error } = deleteSizeSchema.validate({ Id: parseInt(id), ModifiedBy });
    if (error) {
      return res.status(400).json({ message: 'Invalid input', error: error.details });
    }
    const result = await SizeModel.deleteSize(parseInt(id), ModifiedBy);
    if (result.output.Status) {
      res.status(200).json({ message: 'Size deleted (soft) successfully' });
    } else {
      res.status(400).json({ message: result.output.Message || 'Failed to delete size' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error deleting size', error: err.message });
  }
};

module.exports = {
  getSizes,
  createSize,
  updateSize,
  deleteSize
};