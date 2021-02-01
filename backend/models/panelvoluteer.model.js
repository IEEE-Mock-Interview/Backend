const sequelize = require('../database/connection');
const {DataTypes} = require('sequelize')


const PanelVolunteer = sequelize.define(
	'PanelVolunteer',
	{
		panelID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		volunteerID: {type:DataTypes.TEXT, primaryKey:true}
	},
	{ freezeTableName: true, timestamps: false }
);


module.exports = PanelVolunteer;