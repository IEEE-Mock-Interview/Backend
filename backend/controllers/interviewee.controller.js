const Interviewee = require("../models/interviewee.model");
// const { converter } = require('../services/objectConverter');

/**
 *@returns Array<{officerID, name, role, stationID, stationName, location, type, contactNo}>
 */
exports.getInterviewees = async (req, res) => {
  let interviewees = [];
  try {
    interviewees = await Interviewee.findAll();
    // Interviewees = Interviewees.map(item => converter(item.dataValues))
    return res.status(200).send(interviewees);
  } catch (e) {
    return res.status(400).send(e.message);
  }
};

/**
 * @description Auto generates a password and send it to Interviewees mail
 *@returns Object
 */
exports.createInterviewee = async (req, res) => {
  let interviewee = req.body;
  try {
    interviewee = await Interviewee.create(req.body);
    // Interviewee = converter(Interviewee.dataValues);
    // sendMail("SLF New Interviewee Password",password,Interviewee.email)
    return res.status(200).send(interviewee);
  } catch (e) {
    return res.status(400).send({ status: 400, message: e.message });
  }
};

/**
 * @param {Object} req: req.body: Any attribute excluding password
 *@returns Object{officerID, name, role, stationID, stationName, location, type, contactNo}
 */

exports.updateInterviewee = async (req, res) => {
  let interviewee = {};
  try {
    interviewee = await Interviewee.update(
      req.body,
      { where: { intervieweeID: req.params.intervieweeId }, returning: true }
    );
    interviewee = await Interviewee.findOne({
      where: { intervieweeID: req.params.intervieweeId },
    });
    // Interviewee = converter(Interviewee.dataValues)
    return res.status(200).send(interviewee);
  } catch (e) {
    return res.status(400).send(e.message);
  }
};
/**
 * @returns success or error message
 */
exports.deleteInterviewee = async (req, res) => {
  try {
    await Interviewee.destroy({ where: { intervieweeID: req.params.intervieweeId } });
    return res.status(200).send("Interviewee succesfully deleted");
  } catch (e) {
    return res.status(400).send(e.message);
  }
};
