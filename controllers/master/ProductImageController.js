const ProductImageModel = require('../../models/master/ProductImageModel');
const { getProductImagesSchema, createProductImageSchema, deleteProductImageSchema } = require('../../schema/master/ProductImageSchema');
const Joi = require('joi');

const getProductImages = async (req, res) => {
  try {
    const { error, value } = getProductImagesSchema.validate(req.query);
    if (error) {
      return res.status(400).json({ message: 'Invalid query parameters', error: error.details });
    }
    const productImages = await ProductImageModel.getAllProductImages(value);
    const totalCount = productImages.length > 0 ? productImages[0].TotalCount : 0;
    res.status(200).json({ data: productImages, totalCount });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching product images', error: err.message });
  }
};

const createProductImage = async (req, res) => {
  try {
    const { error, value } = createProductImageSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: 'Invalid input', error: error.details });
    }
    const result = await ProductImageModel.insertProductImage(value);
    if (result.output.Status) {
      res.status(201).json({ message: 'Product image created successfully', id: result.output.Id });
    } else {
      res.status(400).json({ message: result.output.Message || 'Failed to create product image' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error creating product image', error: err.message });
  }
};

const deleteProductImage = async (req, res) => {
  try {
    const { id } = req.params;
    const { ModifiedBy } = req.body;
    const { error } = deleteProductImageSchema.validate({ Id: parseInt(id), ModifiedBy });
    if (error) {
      return res.status(400).json({ message: 'Invalid input', error: error.details });
    }
    const result = await ProductImageModel.deleteProductImage(parseInt(id), ModifiedBy);
    if (result.output.Status) {
      res.status(200).json({ message: 'Product image deleted (soft) successfully' });
    } else {
      res.status(400).json({ message: result.output.Message || 'Failed to delete product image' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error deleting product image', error: err.message });
  }
};

module.exports = {
  getProductImages,
  createProductImage,
  deleteProductImage
};