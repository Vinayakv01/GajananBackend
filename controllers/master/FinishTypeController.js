const FinishTypeModel = require('../../models/master/FinishTypeModel');
const { getFinishTypesSchema, createFinishTypeSchema, updateFinishTypeSchema, deleteFinishTypeSchema } = require('../../schema/master/FinishTypeSchema');
const Joi = require('joi');

const getFinishTypes = async (req, res) => {
  try {
    const { error, value } = getFinishTypesSchema.validate(req.query);
    if (error) {
      return res.status(400).json({ message: 'Invalid query parameters', error: error.details });
    }
    const finishTypes = await FinishTypeModel.getAllFinishTypes(value);
    const totalCount = finishTypes.length > 0 ? finishTypes[0].TotalCount : 0;
    res.status(200).json({ data: finishTypes, totalCount });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching finish types', error: err.message });
  }
};

const createFinishType = async (req, res) => {
  try {
    const { error, value } = createFinishTypeSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: 'Invalid input', error: error.details });
    }
    const result = await FinishTypeModel.insertFinishType(value);
    if (result.output.Status) {
      res.status(201).json({ message: 'Finish type created successfully', id: result.output.Id });
    } else {
      res.status(400).json({ message: result.output.Message || 'Failed to create finish type' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error creating finish type', error: err.message });
  }
};

const updateFinishType = async (req, res) => {
  try {
    const { id } = req.params;
    const { Name, ModifiedBy } = req.body;
    const { error, value } = updateFinishTypeSchema.validate({ Id: parseInt(id), Name, ModifiedBy });
    if (error) {
      return res.status(400).json({ message: 'Invalid input', error: error.details });
    }
    const result = await FinishTypeModel.updateFinishType(value);
    if (result.output.Status) {
      res.status(200).json({ message: 'Finish type updated successfully' });
    } else {
      res.status(400).json({ message: result.output.Message || 'Failed to update finish type' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error updating finish type', error: err.message });
  }
};

const deleteFinishType = async (req, res) => {
  try {
    const { id } = req.params;
    const { ModifiedBy } = req.body;
    const { error } = deleteFinishTypeSchema.validate({ Id: parseInt(id), ModifiedBy });
    if (error) {
      return res.status(400).json({ message: 'Invalid input', error: error.details });
    }
    const result = await FinishTypeModel.deleteFinishType(parseInt(id), ModifiedBy);
    if (result.output.Status) {
      res.status(200).json({ message: 'Finish type deleted (soft) successfully' });
    } else {
      res.status(400).json({ message: result.output.Message || 'Failed to delete finish type' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error deleting finish type', error: err.message });
  }
};

module.exports = {
  getFinishTypes,
  createFinishType,
  updateFinishType,
  deleteFinishType
};