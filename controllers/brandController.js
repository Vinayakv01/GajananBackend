const BrandModel = require('../models/brandModel');

const getBrands = async (req, res) => {
  try {
    const brands = await BrandModel.getAllBrands();
    res.status(200).json(brands);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching brands', error: err.message });
  }
};

const createBrand = async (req, res) => {
  const { Name, CreatedBy } = req.body;
  if (!Name || !CreatedBy) {
    return res.status(400).json({ message: 'Name and CreatedBy are required' });
  }

  try {
    await BrandModel.insertBrand({ Name, CreatedBy });
    res.status(201).json({ message: 'Brand created successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error creating brand', error: err.message });
  }
};

const updateBrand = async (req, res) => {
  const { Id, Name, ModifiedBy } = req.body;
  if (!Id || !Name || !ModifiedBy) {
    return res.status(400).json({ message: 'Id, Name and ModifiedBy are required' });
  }

  try {
    await BrandModel.updateBrand({ Id, Name, ModifiedBy });
    res.status(200).json({ message: 'Brand updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error updating brand', error: err.message });
  }
};

const deleteBrand = async (req, res) => {
  const { id } = req.params;

  try {
    await BrandModel.deleteBrand(id);
    res.status(200).json({ message: 'Brand deleted (soft) successfully' });
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
