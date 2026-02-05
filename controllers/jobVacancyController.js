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
      findJob.job_company_name = req.body.job_company_name;
      findJob.job_company_logo = req.body.job_company_logo;
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
    const { location, categories, type, minSalary, search } = req.query;
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

    if (search) {
      orConditions.push(`job_title LIKE '%${search}%'`);
      orConditions.push(`job_company_name LIKE '%${search}%'`);
      orConditions.push(`job_category LIKE '%${search}%'`);
      orConditions.push(`job_location LIKE '%${search}%'`);
      orConditions.push(`job_type LIKE '%${search}%'`);
      orConditions.push(`job_salary LIKE '%${search}%'`);
      orConditions.push(`job_description LIKE '%${search}%'`);
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
    const search = req.query.search || '';
    const offset = (page - 1) * limit;

    let orConditions = []
    if (search != "") {
      orConditions.push(`job_title LIKE '%${search}%'`);
      orConditions.push(`job_company_name LIKE '%${search}%'`);
      orConditions.push(`job_category LIKE '%${search}%'`);
      orConditions.push(`job_location LIKE '%${search}%'`);
      orConditions.push(`job_type LIKE '%${search}%'`);
      orConditions.push(`job_salary LIKE '%${search}%'`);
      orConditions.push(`job_description LIKE '%${search}%'`);
    }

    const whereClause = orConditions.join(' OR ');

    const { count, rows } = await JobVacancy.findAndCountAll({
      where: whereClause != "" ? Sequelize.literal(`(${whereClause})`) : {},
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

    const safeParseJson = (value, fallback) => {
      if (value == null) return fallback;
      if (typeof value === 'object') return value;
      if (typeof value !== 'string') return fallback;
      try {
        return JSON.parse(value);
      } catch {
        return fallback;
      }
    };

    const safeArray = (value) => {
      if (!value) return [];
      if (Array.isArray(value)) return value;
      const parsed = safeParseJson(value, []);
      return Array.isArray(parsed) ? parsed : [];
    };

    // Helper for seeded random to ensure consistency
    const getSeededRandom = (seedStr) => {
      let hash = 0;
      if (!seedStr) return 0;
      const str = String(seedStr);
      for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
      }
      return Math.abs(hash);
    };

    const seed = getSeededRandom(job.job_id || job.id || 'default');

    // Determine theme based on job type or other attributes
    let theme = req.query.theme || 'tikwork'; // Default to tikwork (TikTok style)
    let variation = req.query.variation || 'default'; // default, dark, light, image
    let pattern = req.query.pattern || 'none'; // none, dots, lines, circle, grid
    let font = req.query.font || 'default'; // default, serif, mono, display
    let layout = req.query.layout || 'default'; // default, centered, inverted, minimal
    let align = req.query.align || 'left'; // left, center, right
    let density = req.query.density || 'high'; // high (all info), medium, low (minimal info)
    let template = req.query.template || 'auto'; // auto, sticker, ui, caption, duet, minimal

    // Component Ordering (Default)
    let components = {
      badge: 1,
      title: 2,
      info: 3,
      cta: 4
    };

    // Extract style from job_misc_data if available
    let customStyle = {};
    try {
      const misc = safeParseJson(job.job_misc_data, {});
      if (misc && misc.poster_style) customStyle = misc.poster_style;
    } catch (e) {
      console.error("Error parsing job_misc_data:", e);
    }

    // Apply custom style overrides
    if (customStyle.theme) theme = customStyle.theme;
    if (customStyle.variation) variation = customStyle.variation;
    if (customStyle.pattern) pattern = customStyle.pattern;
    if (customStyle.font) font = customStyle.font;
    if (customStyle.layout) layout = customStyle.layout;
    if (customStyle.align) align = customStyle.align;
    if (customStyle.density) density = customStyle.density;
    if (customStyle.template) template = customStyle.template;
    
    // Auto-selection logic if no specific theme requested
    if (!req.query.theme && !customStyle.theme) {
      const jobType = (job.job_type || '').toLowerCase();
      const jobTitle = (job.job_title || '').toLowerCase();
      const company = (job.job_company_name || '').toLowerCase();

      // Helper to pick array item based on seed
      const pick = (arr, offset = 0) => arr[(seed + offset) % arr.length];

      // Font Options
      const fonts = ['default', 'serif', 'mono', 'display', 'handwriting'];
      font = pick(fonts, 2);

      // Layout Options
      const layouts = ['default', 'centered', 'inverted', 'split'];
      layout = pick(layouts, 3);

      // Alignment Options (Weighted towards left/center for readability)
      const aligns = ['left', 'left', 'center', 'left']; 
      align = pick(aligns, 4);
      
      // Density Options
      const densities = ['high', 'high', 'medium', 'high'];
      density = pick(densities, 5);

      // Shuffle Components Logic using seed
      // We want to shuffle the values 1, 2, 3, 4 based on seed
      const shuffleOrder = (seed) => {
        const order = [1, 2, 3, 4];
        // Fisher-Yates shuffle with seeded random
        for (let i = order.length - 1; i > 0; i--) {
          const j = (seed + i) % (i + 1);
          [order[i], order[j]] = [order[j], order[i]];
        }
        return order;
      };
      
      const order = shuffleOrder(seed);
      components = {
        badge: order[0],
        title: order[1],
        info: order[2],
        cta: order[3]
      };

      // Keyword based theme selection
      if (jobTitle.includes('tiktok') || jobTitle.includes('content') || jobTitle.includes('social') || company.includes('tiktok')) {
        theme = 'tikwork';
        // Deterministic variation for TikWork based on seed
        const vars = ['default', 'dark', 'light', 'neon'];
        variation = vars[seed % vars.length];
        
        // TikWork specific overrides for better aesthetic
        font = pick(['default', 'display', 'mono'], 2); // Avoid serif for tiktok style
        layout = pick(['default', 'centered', 'inverted'], 3);
        
        // Ensure Title is prominent in TikWork (usually top or middle)
        // Let's force badge to be small/top or bottom
      } else if (jobType.includes('full') || jobTitle.includes('manager') || jobTitle.includes('lead')) {
        theme = 'professional';
        const vars = ['tikwork','default', 'navy', 'slate', 'dark'];
        variation = vars[seed % vars.length];
        font = pick(['default', 'serif', 'display'], 2);
      } else if (jobType.includes('intern') || jobType.includes('magang') || jobTitle.includes('junior')) {
        theme = 'playful';
        const vars = ['default', 'yellow', 'pink', 'orange'];
        variation = vars[seed % vars.length];
        font = pick(['tikwork','default', 'handwriting', 'display'], 2);
      } else if (jobType.includes('contract') || jobType.includes('kontrak') || jobTitle.includes('senior')) {
        theme = 'bold';
        const vars = ['default', 'contrast', 'mono'];
        variation = vars[seed % vars.length];
        font = pick(['display', 'mono', 'default'], 2);
      } else if (jobType.includes('part') || jobType.includes('paruh') || jobType.includes('freelance')) {
        theme = 'casual';
        const vars = ['tikwork','default', 'soft', 'blue', 'green'];
        variation = vars[seed % vars.length];
        font = pick(['default', 'handwriting', 'serif'], 2);
      } else {
        // Deterministic random for others
        const themes = ['tikwork', 'modern', 'professional', 'playful', 'bold', 'casual'];
        theme = themes[seed % themes.length];
        
        // Pick variation based on a secondary seed calculation (rotate seed)
        const vars = ['default', 'dark', 'light']; 
        variation = vars[(seed + 1) % vars.length];
      }
      
      // Auto-assign patterns based on seed
      const patterns = ['none', 'dots', 'lines', 'grid', 'circle'];
      pattern = patterns[seed % patterns.length];
    }

    // Auto template selection for TikWork (unless explicitly set)
    if ((template === 'auto' || !template) && theme === 'tikwork') {
      const templates = ['sticker', 'ui', 'caption', 'duet', 'minimal'];
      template = templates[seed % templates.length];
    }

    // Title Length Calculation
    let titleLength = 'medium';
    const titleLen = job.job_title ? job.job_title.length : 0;
    if (titleLen < 15) titleLength = 'short';
    else if (titleLen > 40) titleLength = 'super-long';
    else if (titleLen > 25) titleLength = 'long';

    // Prepare visual configuration
    const config = {
      theme,
      variation,
      pattern,
      font,
      layout,
      align,
      density,
      components,
      titleLength,
      template,
      seed,
      primaryColor: req.query.color || job.card_color || customStyle.primaryColor || null,
      backgroundImage: req.query.bg || job.card_image || customStyle.backgroundImage || null,
    };

    const categories = safeArray(job.job_category).filter(Boolean).map(String);
    const companyHandle = '@' + String(job.job_company_name || 'tikwork')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '')
      .slice(0, 22);

    const posterData = {
      categories: categories.slice(0, 4),
      companyHandle,
    };

    if(job.job_company_name.includes('https')){
      job.job_company_name = "-";
      posterData.companyHandle = "-";
    }

    if(job.job_company_logo.includes('N/A')){
      job.job_company_logo = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(job.job_company_name || 'TikWork');
    }

    res.render('poster', { job, config, poster: posterData });
  } catch (error) {
    res.status(500).send(error.message);
  }
};


// Get latest input jobs
exports.getLatestInput = async (req, res) => {
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
        ['id', 'DESC']
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