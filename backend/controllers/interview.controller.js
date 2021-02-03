const Interview = require("../models/interview.model");
const Interviewee = require("../models/interviewee.model");
const converter = require('../util/converter')

/**
 *@returns Array<{officerID, name, role, stationID, stationName, location, type, contactNo}>
 */
exports.getInterviews = async (req, res) => {
  let interviews = [];
  try {
    interviews = await Interview.findAll();
    interviews = interviews.map(item => converter(item.dataValues))
    return res.status(200).send(interviews);
  } catch (e) {
    return res.status(400).send(e.message);
  }
};

/**
 *@returns Array<{officerID, name, role, stationID, stationName, location, type, contactNo}>
 */
exports.getInterviewsOfAssignedPanel = async (req, res) => {
  let interviews = [];
  try {
    interviews = await Interview.findAll({attributes:{exclude:'feedback'}, where:{panelID: req.params.panelID}, include:{model:Interviewee}});
    interviews = interviews.map(item => converter(item.dataValues))
    return res.status(200).send(interviews);
  } catch (e) {
    return res.status(400).send(e.message);
  }
};

/**
 *@returns Array<{officerID, name, role, stationID, stationName, location, type, contactNo}>
 */
exports.getAssignedInterviews = async (req, res) => {
  let interviews = [];
  try {
    interviews = await Interview.findAll({where:{panelID: req.params.panelID}, include:{model:Interviewee}});
    interviews = interviews.map(item => converter(item.dataValues))
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
    interview = converter(interview.dataValues);
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
    interview = converter(interview.dataValues)
    return res.status(200).send(interview);
  } catch (e) {
    return res.status(400).send(e.message);
  }
};
/**
 * @param {Object} req: req.body: Any attribute excluding password
 *@returns Object{officerID, name, role, stationID, stationName, location, type, contactNo}
 */

exports.updateAssignedInterview = async (req, res) => {
  let interview = {};
  try {
    interview = await Interview.update(
      req.body,
      { where: { interviewID: req.params.interviewId }, returning: true }
    );
    interview = await Interview.findOne({
      where: { interviewID: req.params.interviewId },
    });
    interview = converter(interview.dataValues)
    return res.status(200).send(interview);
  } catch (e) {
    return res.status(400).send(e.message);
  }
};
/**
 * @param {Object} req: req.body: Any attribute excluding password
 *@returns Object{officerID, name, role, stationID, stationName, location, type, contactNo}
 */

exports.updateInterviewOfAssignedPanel = async (req, res) => {
  let interview = {};
  try {
    interview = await Interview.update(
      req.body,
      { where: { interviewID: req.params.interviewId }, returning: true }
    );
    interview = await Interview.findOne({
      where: { interviewID: req.params.interviewId },
    });
    interview = converter(interview.dataValues)
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
