const express = require('express');
const CompanyController = require('../controllers/company.controller')
const router = express.Router();

/**
 * @description get all companies
 */
router.get('/', CompanyController.getCompanies);

/**
 * @description get all companies
 */
router.get('/:companyId', CompanyController.getCompany);

/**

/**
 * @description update company
 */
router.put('/:companyId', CompanyController.updateCompany);

/**
 * @description create company
 */
router.post('/', CompanyController.createCompany);


/**
 * @description delete company
 */
router.delete('/:companyId', CompanyController.deleteCompany);

/**
 * @description change the password of the user
 */
// router.post('/changePassword/:userId', UserController.changePassword);


router.all('*', (req, res) => {
	res.status(404).json({ status: 404, message: 'Not found' });
});

module.exports = router;
