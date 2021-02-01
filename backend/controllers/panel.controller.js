const Panel = require("../models/panel.model");
const User = require("../models/user.model");
const sequelize = require("../database/connection");
const PanelVolunteer = require("../models/panelvoluteer.model");
const bcrypt = require("bcrypt");
var generator = require("generate-password");
// const { converter } = require('../services/objectConverter');

/**
 *@returns Array<{officerID, name, role, stationID, stationName, location, type, contactNo}>
 */
exports.getPanels = async (req, res) => {
  let panels = [];
  try {
    panels = await Panel.findAll({
      where: { companyID: req.params.companyId },
      include: { model: User },
    });
    // Panels = Panels.map(item => converter(item.dataValues))
    return res.status(200).send(panels);
  } catch (e) {
    return res.status(400).send(e.message);
  }
};

/**
 * @description Auto generates a password and send it to Panels mail
 *@returns Object
 */
exports.createPanel = async (req, res) => {
  let panel = {};
  let user = req.body;
  let volunteer = [];
  let t = await sequelize.transaction();
  try {
    let password = generator.generate({
      length: 10,
      numbers: true,
    });
    console.log(password);
    let salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    user = await User.create({ ...user, role: "Panel" }, { transaction: t });
    let id = user.id;
    console.log(user.id);
    panel = await Panel.create({ ...req.body, userID: id }, { transaction: t });
    if (req.body.hasOwnProperty("Volunteer")) {
      req.body.Volunteer = req.body.Volunteer.map((item) => {
        return { ...item, panelID: panel.panelID };
      });
      volunteer = await PanelVolunteer.bulkCreate(req.body.Volunteer, {
        transaction: t,
      });
    }
    await t.commit();
    // Panel = converter(Panel.dataValues);
    return res.status(200).send(panel);
  } catch (e) {
    await t.rollback();
    return res.status(400).send({ status: 400, message: e.message });
  }
};

/**
 * @param {Object} req: req.body: Any attribute excluding password
 *@returns Object{officerID, name, role, stationID, stationName, location, type, contactNo}
 */

exports.updatePanel = async (req, res) => {
  let panel = {};
  let volunteer = [];
  let t = await sequelize.transaction();
  try {
    panel = await Panel.update(
      req.body,
      {
        where: { panelID: req.params.panelId },
        returning: true,
        transaction: t,
      }
    );
    if (req.body.hasOwnProperty("Volunteer")) {
      volunteer = await PanelVolunteer.bulkCreate(req.body.Volunteer, {
        ignoreDuplicates: true,
        transaction: t,
      });
    }
    await t.commit();
    panel = await Panel.findOne({ where: { panelID: req.params.panelId } });
    // Panel = converter(Panel.dataValues)
    return res.status(200).send(panel);
  } catch (e) {
    await t.rollback();
    return res.status(400).send(e.message);
  }
};
/**
 * @returns success or error message
 */
exports.deletePanel = async (req, res) => {
  try {
    await Panel.destroy({ where: { panelID: req.params.panelId } });
    return res.status(200).send("Panel succesfully deleted");
  } catch (e) {
    return res.status(400).send(e.message);
  }
};
