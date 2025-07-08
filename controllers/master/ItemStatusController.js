const ItemStatusModel = require('../../models/master/ItemStatusModel');
const { getItemStatusesSchema } = require('../../schema/master/ItemStatusSchema');
const Joi = require('joi');

const getItemStatuses = async (req, res) => {
  try {
    const { error, value } = getItemStatusesSchema.validate(req.query);
    if (error) {
      return res.status(400).json({ message: 'Invalid query parameters', error: error.details });
    }
    const itemStatuses = await ItemStatusModel.getAllItemStatuses(value);
    const totalCount = itemStatuses.length > 0 ? itemStatuses[0].TotalCount : 0;
    res.status(200).json({ data: itemStatuses, totalCount });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching item statuses', error: err.message });
  }
};

module.exports = {
  getItemStatuses
};