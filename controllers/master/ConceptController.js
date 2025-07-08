const ConceptModel = require('../../models/master/ConceptModel');
const { getConceptsSchema, createConceptSchema, updateConceptSchema, deleteConceptSchema } = require('../../schema/master/ConceptSchema');
const Joi = require('joi');

const getConcepts = async (req, res) => {
  try {
    const { error, value } = getConceptsSchema.validate(req.query);
    if (error) {
      return res.status(400).json({ message: 'Invalid query parameters', error: error.details });
    }
    const concepts = await ConceptModel.getAllConcepts(value);
    const totalCount = concepts.length > 0 ? concepts[0].TotalCount : 0;
    res.status(200).json({ data: concepts, totalCount });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching concepts', error: err.message });
  }
};

const createConcept = async (req, res) => {
  try {
    const { error, value } = createConceptSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: 'Invalid input', error: error.details });
    }
    const result = await ConceptModel.insertConcept(value);
    if (result.output.Status) {
      res.status(201).json({ message: 'Concept created successfully', id: result.output.Id });
    } else {
      res.status(400).json({ message: result.output.Message || 'Failed to create concept' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error creating concept', error: err.message });
  }
};

const updateConcept = async (req, res) => {
  try {
    const { id } = req.params;
    const { Name, ModifiedBy } = req.body;
    const { error, value } = updateConceptSchema.validate({ Id: parseInt(id), Name, ModifiedBy });
    if (error) {
      return res.status(400).json({ message: 'Invalid input', error: error.details });
    }
    const result = await ConceptModel.updateConcept(value);
    if (result.output.Status) {
      res.status(200).json({ message: 'Concept updated successfully' });
    } else {
      res.status(400).json({ message: result.output.Message || 'Failed to update concept' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error updating concept', error: err.message });
  }
};

const deleteConcept = async (req, res) => {
  try {
    const { id } = req.params;
    const { ModifiedBy } = req.body;
    const { error } = deleteConceptSchema.validate({ Id: parseInt(id), ModifiedBy });
    if (error) {
      return res.status(400).json({ message: 'Invalid input', error: error.details });
    }
    const result = await ConceptModel.deleteConcept(parseInt(id), ModifiedBy);
    if (result.output.Status) {
      res.status(200).json({ message: 'Concept deleted (soft) successfully' });
    } else {
      res.status(400).json({ message: result.output.Message || 'Failed to delete concept' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error deleting concept', error: err.message });
  }
};

module.exports = {
  getConcepts,
  createConcept,
  updateConcept,
  deleteConcept
};