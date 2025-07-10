const ProductModel = require('../../models/master/ProductModel');
const { getProductsSchema, getProductByIdSchema, createProductSchema, updateProductSchema, deleteProductSchema } = require('../../schema/master/ProductSchema');
const Joi = require('joi');

const getProducts = async (req, res) => {
  try {
    const { error, value } = getProductsSchema.validate(req.query);
    if (error) {
      return res.status(400).json({ message: 'Invalid query parameters', error: error.details });
    }
    const products = await ProductModel.getAllProducts(value);
    const totalCount = products.length > 0 ? products[0].TotalCount : 0;
    res.status(200).json({ data: products, totalCount });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching products', error: err.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = getProductByIdSchema.validate({ Id: parseInt(id) });
    if (error) {
      return res.status(400).json({ message: 'Invalid input', error: error.details });
    }
    const result = await ProductModel.getProductById(parseInt(id));
    if (result.output.Status && result.recordset.length > 0) {
      res.status(200).json({ data: result.recordset[0] });
    } else {
      res.status(404).json({ message: result.output.Message || 'Product not found or inactive' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error fetching product', error: err.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const { error, value } = createProductSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: 'Invalid input', error: error.details });
    }
    const result = await ProductModel.insertProduct(value);
    if (result.output.Status) {
      res.status(201).json({ message: 'Product created successfully', id: result.output.Id });
    } else {
      res.status(400).json({ message: result.output.Message || 'Failed to create product' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error creating product', error: err.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { error, value } = updateProductSchema.validate({ Id: parseInt(id), ...req.body });
    if (error) {
      return res.status(400).json({ message: 'Invalid input', error: error.details });
    }
    const result = await ProductModel.updateProduct(value);
    if (result.output.Status) {
      res.status(200).json({ message: 'Product updated successfully' });
    } else {
      res.status(400).json({ message: result.output.Message || 'Failed to update product' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error updating product', error: err.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { ModifiedBy } = req.body;
    const { error } = deleteProductSchema.validate({ Id: parseInt(id), ModifiedBy });
    if (error) {
      return res.status(400).json({ message: 'Invalid input', error: error.details });
    }
    const result = await ProductModel.deleteProduct(parseInt(id), ModifiedBy);
    if (result.output.Status) {
      res.status(200).json({ message: 'Product deleted (soft) successfully' });
    } else {
      res.status(400).json({ message: result.output.Message || 'Failed to delete product' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error deleting product', error: err.message });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};