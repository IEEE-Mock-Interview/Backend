const Company = require('../models/company.model');
const Panel = require('../models/panel.model');
const User = require('../models/user.model');
const converter = require('../util/converter')

/**
 *@returns Array<{officerID, name, role, stationID, stationName, location, type, contactNo}> 
 */
exports.getCompanies = async (req, res) => {
	let companies = [];
	try {
		companies = await Company.findAll();
		companies = companies.map(item => converter(item.dataValues))
		return res.status(200).send(companies);
	} catch (e) {
		return res.status(400).send(e.message);
	}
};

/**
 * @description Auto generates a password and send it to Companys mail
 *@returns Object 
 */
exports.createCompany = async (req, res) => {
	let company = req.body;
	try {
		company = await Company.create({...req.body});
		company = converter(company.dataValues);
		return res
			.status(200)
			.send(company);
	} catch (e) {
		return res.status(400).send({ status: 400, message: e.message });
	}
};


/**
 * @param {Object} req: req.body: Any attribute excluding password
 *@returns Object{officerID, name, role, stationID, stationName, location, type, contactNo}
 */

exports.updateCompany = async (req, res) => {
	let company = {};
	try {
		company = await Company.update({ ...req.body}, { where: { companyID: req.params.companyId }, returning: true });
		company = await Company.findOne({where: { companyID: req.params.companyId }});
		company = converter(company.dataValues)
		return res.status(200).send(company);
	} catch (e) {
		return res.status(400).send(e.message);
	}
};
/**
 * @returns success or error message 
 */
exports.deleteCompany = async (req, res) => {
	try {
		await Company.destroy({ where: { companyID: req.params.companyId } });
		return res.status(200).send('Company succesfully deleted');
	} catch (e) {
		return res.status(400).send(e.message);
	}
};
