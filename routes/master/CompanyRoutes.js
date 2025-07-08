const express = require('express');
const router = express.Router();
const companyController = require('../../controllers/master/CompanyController');

router.get('/companies', companyController.getCompanies);
router.post('/companies', companyController.createCompany);
router.delete('/companies/:id', companyController.deleteCompany);

module.exports = router;