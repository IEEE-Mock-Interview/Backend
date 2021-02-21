const sequelize = require("../database/connection");
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
    interviews = await Interview.findAll({attributes:{exclude:'feedback'}, where:{panelID: req.params.panelId}, include:{model:Interviewee}});
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
    interviews = await Interview.findAll({where:{panelID: req.params.panelId}, include:{model:Interviewee}});
    interviews = interviews.map(item => converter(item.dataValues))
    return res.status(200).send(interviews);
  } catch (e) {
    return res.status(400).send(e.message);
  }
};

/**
 * @description Create a new interview
 * @description Socket message: Admin room,only to panel and volunteer 
 *@returns Object
 */
exports.createInterview = async (req, res) => {
  let interview = req.body;
  // try {
    interview = await Interview.create(req.body);
    interview = converter(interview.dataValues);

    let io = req.app.get('socket');
		io.in("admin").emit('interview','post',interview);
    let volunteerRoom = io.sockets.adapter.rooms.get('volunteer')
    let panelRoom = io.sockets.adapter.rooms.get('panel')
    console.log(Array.from(io.sockets.adapter.nsp.sockets));
    let volSocket = Array.from(io.sockets.adapter.nsp.sockets).find(item => volunteerRoom.includes(item.id) && item.panelID == interview.panelID)
    let panelSocket = Array.from(io.sockets.adapter.nsp.sockets).find(item => panelRoom.includes(item.id) && item.panelID == interview.panelID)
    io.to(volSocket.id).emit('interview','post',interview);
		io.to(panelSocket.id).emit('interview','put',interview);

    return res.status(200).send(interview);
  // } catch (e) {
  //   return res.status(400).send({ status: 400, message: e.message });
  // }
};

/**
 * @param {Object} req: req.body: Any attribute excluding password
 *@returns Object{officerID, name, role, stationID, stationName, location, type, contactNo}
 */

exports.updateInterview = async (req, res) => {
  let interview = {};
  let t = await sequelize.transaction()
  let updateVal = false;
  try {
    if(req.body.hasOwnProperty("state")){
      interview = await Interview.findOne({
        where: { interviewID: req.params.interviewId },
      });
      updateVal = interview.state == 'Ongoing' ? false:true;
      if(interview.state == 'Not Started' && req.body.state == 'Ongoing'){
          updateVal = false;
      }
      else if(interview.state == 'Ongoing' && req.body.state == 'Completed'){
          updateVal = true;
      }
      interviewee = await Interviewee.update(
        {availability : updateVal},
        { where: { intervieweeID: req.body.intervieweeID }, returning: true, transaction:t }
      );
    }
   
    interview = await Interview.update(
      req.body,
      { where: { interviewID: req.params.interviewId }, returning: true, transaction:t }
    );
    await t.commit();
    interview = await Interview.findOne({
      where: { interviewID: req.params.interviewId },
    });
    interview = converter(interview.dataValues)
    interview.availability = updateVal;
    return res.status(200).send(interview);
  } catch (e) {
    await t.rollback();
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
      {state: req.body.state},
      { where: { interviewID: req.params.interviewId }, returning: true }
    );
    interview = await Interview.findOne({
      where: { interviewID: req.params.interviewId },
    });
    interview = converter(interview.dataValues)
    let io = req.app.get('socket');
		io.in("volunteer-panel").emit('interview','put',interview);
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
