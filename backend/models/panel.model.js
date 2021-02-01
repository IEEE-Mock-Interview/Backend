const sequelize = require('../database/connection');
const {DataTypes} = require('sequelize')
const User = require('./user.model');
const Company = require('./company.model');

const Panel = sequelize.define(
	'Panel',
	{
		panelID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true},
		userID: DataTypes.INTEGER,
		companyID:  DataTypes.INTEGER,
		link: DataTypes.TEXT,
	},
	{ freezeTableName: true, timestamps: false }
);

Panel.belongsTo(User,{foreignKey:'userID'})
Panel.belongsTo(Company,{foreignKey:'companyID'})
module.exports = Panel;


