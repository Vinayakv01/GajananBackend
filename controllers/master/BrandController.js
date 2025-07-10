const model = require('../../service/master/BrandModel');
const { get, create, update} = require('../../schema/master/BrandSchema');
const joi = require('joi');

const get = async (req, res) => {
    const { value } = get(req.query);
    const brands = await model.get(value);
    const totalCount = brands.length > 0 ? brands[0].TotalCount : 0;
    res.json({ data: brands, totalCount });
};

const getById = async (req, res) => {
    const { id } = req.params;
    const result = await model.getById((id));
    res.json({ data: result.output });
};

const create = async (req, res) => {
    const { value } = create(req.body);
    const result = await model.insert(value);
    res.json({ message: result.output.Message , id: result.output.Id });
};

const update = async (req, res) => { 
    const { id } = req.params;
    const { name, modifiedBy } = req.body;
    const { value } = update({id, name, modifiedBy });
    const result = await model.update(value);
    res.json({ message: result.output.Message , id: result.output.Id });
};

const deleteById = async (req, res) => {
    const { id } = req.params;
    const result = await model.delete(id);
    res.json({ message: result.output.Message , status: result.output.Status }); 
};

module.exports = {
  getBrands,
  createBrand,
  updateBrand,
  deleteBrand
};