const { Op, Sequelize } = require('sequelize');
const JobVacancy = require('../models/JobVacancy');

// Create a new job vacancy
exports.createJob = async (req, res) => {
  try {
    const findJob = await JobVacancy.findOne({ where: { job_id: req.body.job_id } });
    if (findJob) {
      findJob.job_title = req.body.job_title;
      findJob.job_description = req.body.job_description;
      findJob.job_salary = req.body.job_salary;
      findJob.job_type = req.body.job_type;
      findJob.job_misc_data = req.body.job_misc_data;
      await findJob.save();
      res.status(201).json(findJob);
    } else {
      const job = await JobVacancy.create(req.body);
      res.status(201).json(job);
    }

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all job vacancies with pagination
exports.getAllJobs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const { count, rows } = await JobVacancy.findAndCountAll({
      limit,
      offset
    });

    res.json({
      total: count,
      page,
      totalPages: Math.ceil(count / limit),
      data: rows
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single job vacancy
exports.getJob = async (req, res) => {
  try {
    const job = await JobVacancy.findByPk(req.params.id);
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }
    res.json(job);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a job vacancy
exports.updateJob = async (req, res) => {
  try {
    const [updated] = await JobVacancy.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedJob = await JobVacancy.findByPk(req.params.id);
      return res.json(updatedJob);
    }
    return res.status(404).json({ error: 'Job not found' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a job vacancy
exports.deleteJob = async (req, res) => {
  try {
    const deleted = await JobVacancy.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      return res.json({ message: 'Job deleted' });
    }
    return res.status(404).json({ error: 'Job not found' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get personalized "For You" jobs
exports.getForYouJobs = async (req, res) => {
  try {
    const { location, categories, type, minSalary } = req.query;
    let where = {};

    // if (location) where.job_location = location;
    // if (type) where.job_type = type;
    // if (minSalary) where.job_salary = { [Op.gte]: minSalary };
    let orConditions = []
    if (categories) {

      orConditions = categories.split(",").map(category => {
        const escaped = category.replace(/'/g, "\\'"); // Escape single quotes for safety
        return `JSON_SEARCH(LOWER(JSON_EXTRACT(job_category, '$')), 'one', '%${escaped.toLowerCase()}%') IS NOT NULL`;
      });

    }


    const whereClause = orConditions.join(' OR ');

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const { count, rows } = await JobVacancy.findAndCountAll({
      where: whereClause != "" ? Sequelize.literal(`(${whereClause})`) : {},
      // where: {
      //   Sequelize.literal(`JSON_CONTAINS(job_category, '["Sales Management"]')`)
      // },
      // where: {
      //   [Op.and]: [
      //     Sequelize.where(Sequelize.fn('JSON_CONTAINS', Sequelize.col('job_category'), '$.notifications.email'), true),
      //     Sequelize.where(Sequelize.fn('JSON_EXTRACT', Sequelize.col('preferences'), '$.notifications.sms'), false)
      //   ]
      // },
      order: [
        ['view_count', 'DESC'],
        ['love_count', 'DESC'],
        ['job_created_date', 'DESC']
      ],
      limit,
      offset
    });

    res.json({
      total: count,
      page,
      totalPages: Math.ceil(count / limit),
      data: rows
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get trending "Explore" jobs
exports.getExploreJobs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const { count, rows } = await JobVacancy.findAndCountAll({
      order: [
        ['view_count', 'DESC'],
        ['love_count', 'DESC']
      ],
      limit,
      offset
    });
    res.json({
      total: count,
      page,
      totalPages: Math.ceil(count / limit),
      data: rows
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Generate Job Poster
exports.getJobPoster = async (req, res) => {
  try {
    const job = await JobVacancy.findByPk(req.params.id);
    if (!job) {
      return res.status(404).send('Job not found');
    }

    // Determine theme based on job type or other attributes
    let theme = 'modern'; // Default
    const jobType = (job.job_type || '').toLowerCase();

    if (jobType.includes('full')) {
      theme = 'professional';
    } else if (jobType.includes('intern') || jobType.includes('magang')) {
      theme = 'playful';
    } else if (jobType.includes('contract') || jobType.includes('kontrak')) {
      theme = 'bold';
    } else if (jobType.includes('part') || jobType.includes('paruh')) {
      theme = 'casual';
    }

    res.render('poster', { job, theme });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
