const ManufacturerModel = require('../../models/master/ManufacturerModel');
const { getManufacturersSchema, createManufacturerSchema, updateManufacturerSchema } = require('../../schema/master/ManufacturerSchema');
const Joi = require('joi');

const getManufacturers = async (req, res) => {
  try {
    const { error, value } = getManufacturersSchema.validate(req.query);
    if (error) {
      return res.status(400).json({ message: 'Invalid query parameters', error: error.details });
    }
    const manufacturers = await ManufacturerModel.getAllManufacturers(value);
    const totalCount = manufacturers.length > 0 ? manufacturers[0].TotalCount : 0;
    res.status(200).json({ data: manufacturers, totalCount });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching manufacturers', error: err.message });
  }
};

const createManufacturer = async (req, res) => {
  try {
    const { error, value } = createManufacturerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: 'Invalid input', error: error.details });
    }
    const result = await ManufacturerModel.insertManufacturer(value);
    if (result.output.Status) {
      res.status(201).json({ message: 'Manufacturer created successfully', id: result.output.Id });
    } else {
      res.status(400).json({ message: result.output.Message || 'Failed to create manufacturer' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error creating manufacturer', error: err.message });
  }
};

const updateManufacturer = async (req, res) => {
  try {
    const { id } = req.params;
    const { Name, ModifiedBy } = req.body;
    const { error, value } = updateManufacturerSchema.validate({ Id: parseInt(id), Name, ModifiedBy });
    if (error) {
      return res.status(400).json({ message: 'Invalid input', error: error.details });
    }
    const result = await ManufacturerModel.updateManufacturer(value);
    if (result.output.Status) {
      res.status(200).json({ message: 'Manufacturer updated successfully' });
    } else {
      res.status(400).json({ message: result.output.Message || 'Failed to update manufacturer' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error updating manufacturer', error: err.message });
  }
};

const deleteManufacturer = async (req, res) => {
  try {
    const { id } = req.params;
    const { ModifiedBy } = req.body;
    const idValidation = Joi.number().integer().positive().required().validate(id);
    const modifiedByValidation = Joi.number().integer().positive().required().validate(ModifiedBy);
    if (idValidation.error) {
      return res.status(400).json({ message: 'Invalid manufacturer ID', error: idValidation.error.details });
    }
    if (modifiedByValidation.error) {
      return res.status(400).json({ message: 'Invalid ModifiedBy value', error: modifiedByValidation.error.details });
    }
    const result = await ManufacturerModel.deleteManufacturer(id, ModifiedBy);
    if (result.output.Status) {
      res.status(200).json({ message: 'Manufacturer deleted (soft) successfully' });
    } else {
      res.status(400).json({ message: result.output.Message || 'Failed to delete manufacturer' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error deleting manufacturer', error: err.message });
  }
};

module.exports = {
  getManufacturers,
  createManufacturer,
  updateManufacturer,
  deleteManufacturer
};