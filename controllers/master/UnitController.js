const UnitModel = require('../../models/master/UnitModel');
const { getUnitsSchema, getUnitByIdSchema, createUnitSchema, updateUnitSchema, deleteUnitSchema } = require('../../schema/master/UnitSchema');
const Joi = require('joi');

const getUnits = async (req, res) => {
  try {
    const { error, value } = getUnitsSchema.validate(req.query);
    if (error) {
      return res.status(400).json({ message: 'Invalid query parameters', error: error.details });
    }
    const units = await UnitModel.getAllUnits(value);
    const totalCount = units.length > 0 ? units[0].TotalCount : 0;
    res.status(200).json({ data: units, totalCount });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching units', error: err.message });
  }
};

const getUnitById = async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = getUnitByIdSchema.validate({ Id: parseInt(id) });
    if (error) {
      return res.status(400).json({ message: 'Invalid input', error: error.details });
    }
    const result = await UnitModel.getUnitById(parseInt(id));
    if (result.output.Status && result.recordset.length > 0) {
      res.status(200).json({ data: result.recordset[0] });
    } else {
      res.status(404).json({ message: result.output.Message || 'Unit not found or inactive' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error fetching unit', error: err.message });
  }
};

const createUnit = async (req, res) => {
  try {
    const { error, value } = createUnitSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: 'Invalid input', error: error.details });
    }
    const result = await UnitModel.insertUnit(value);
    if (result.output.Status) {
      res.status(201).json({ message: 'Unit created successfully', id: result.output.Id });
    } else {
      res.status(400).json({ message: result.output.Message || 'Failed to create unit' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error creating unit', error: err.message });
  }
};

const updateUnit = async (req, res) => {
  try {
    const { id } = req.params;
    const { error, value } = updateUnitSchema.validate({ Id: parseInt(id), ...req.body });
    if (error) {
      return res.status(400).json({ message: 'Invalid input', error: error.details });
    }
    const result = await UnitModel.updateUnit(value);
    if (result.output.Status) {
      res.status(200).json({ message: 'Unit updated successfully' });
    } else {
      res.status(400).json({ message: result.output.Message || 'Failed to update unit' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error updating unit', error: err.message });
  }
};

const deleteUnit = async (req, res) => {
  try {
    const { id } = req.params;
    const { ModifiedBy } = req.body;
    const { error } = deleteUnitSchema.validate({ Id: parseInt(id), ModifiedBy });
    if (error) {
      return res.status(400).json({ message: 'Invalid input', error: error.details });
    }
    const result = await UnitModel.deleteUnit(parseInt(id), ModifiedBy);
    if (result.output.Status) {
      res.status(200).json({ message: 'Unit deleted (soft) successfully' });
    } else {
      res.status(400).json({ message: result.output.Message || 'Failed to delete unit' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error deleting unit', error: err.message });
  }
};

module.exports = {
  getUnits,
  getUnitById,
  createUnit,
  updateUnit,
  deleteUnit
};