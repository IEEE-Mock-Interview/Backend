const Interview = require("../models/interview.model");
// const { converter } = require('../services/objectConverter');

/**
 *@returns Array<{officerID, name, role, stationID, stationName, location, type, contactNo}>
 */
exports.getInterviews = async (req, res) => {
  let interviews = [];
  try {
    interviews = await Interview.findAll();
    // Interviews = Interviews.map(item => converter(item.dataValues))
    return res.status(200).send(interviews);
  } catch (e) {
    return res.status(400).send(e.message);
  }
};

/**
 * @description Auto generates a password and send it to Interviews mail
 *@returns Object
 */
exports.createInterview = async (req, res) => {
  let interview = req.body;
  try {
    interview = await Interview.create(req.body);
    // Interview = converter(Interview.dataValues);
    // sendMail("SLF New Interview Password",password,Interview.email)
    return res.status(200).send(interview);
  } catch (e) {
    return res.status(400).send({ status: 400, message: e.message });
  }
};

/**
 * @param {Object} req: req.body: Any attribute excluding password
 *@returns Object{officerID, name, role, stationID, stationName, location, type, contactNo}
 */

exports.updateInterview = async (req, res) => {
  let interview = {};
  try {
    interview = await Interview.update(
      req.body,
      { where: { interviewID: req.params.interviewId }, returning: true }
    );
    interview = await Interview.findOne({
      where: { interviewID: req.params.interviewId },
    });
    // Interview = converter(Interview.dataValues)
    return res.status(200).send(interview);
  } catch (e) {
    return res.status(400).send(e.message);
  }
};
/**
 * @returns success or error message
 */
exports.deleteInterview = async (req, res) => {
  try {
    await Interview.destroy({ where: { interviewID: req.params.interviewId } });
    return res.status(200).send("Interview succesfully deleted");
  } catch (e) {
    return res.status(400).send(e.message);
  }
};
