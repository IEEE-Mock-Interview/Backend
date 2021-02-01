const sequelize = require('../database/connection');
const {DataTypes} = require('sequelize')


const Interviewee = sequelize.define(
	'Interviewee',
	{
		intervieweeID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		name: DataTypes.TEXT,
		email:{ type:DataTypes.TEXT, unique:true},
		cv: DataTypes.TEXT,
        contactNo: DataTypes.TEXT,
        intervieweeImg: DataTypes.TEXT
	},
	{ freezeTableName: true, timestamps: false }
);


module.exports = Interviewee;