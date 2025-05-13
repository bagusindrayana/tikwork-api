const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const JobVacancy = sequelize.define('job_vacancy', {
  job_id: {
    type: DataTypes.STRING,
    allowNull: false
  },
  job_title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  job_company_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  job_company_logo: {
    type: DataTypes.STRING
  },
  job_salary: {
    type: DataTypes.STRING
  },
  job_category: {
    type: DataTypes.JSON,
    defaultValue: []
  },
  job_location: {
    type: DataTypes.STRING,
    allowNull: true
  },
  job_description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  view_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  love_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  job_type: {
    type: DataTypes.STRING,
    allowNull: true
  },
  job_created_date: {
    type: DataTypes.DATE,
    allowNull: true
  },
  job_source: {
    type: DataTypes.STRING
  },
  job_link: {
    type: DataTypes.TEXT
  },
  job_misc_data: {
    type: DataTypes.JSON,
    defaultValue: []
  },
  card_color: {
    type: DataTypes.STRING,
    allowNull: true
  },
  card_image: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  timestamps: false,
  tableName: 'job_vacancies'
});

module.exports = JobVacancy;
