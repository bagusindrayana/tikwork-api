const { Op } = require('sequelize');
const JobVacancy = require('../models/JobVacancy');
const PosterService = require('../services/PosterService');

class PosterController {
  /**
   * Generate and render job poster using Tailwind CSS
   */
  async getJobPoster(req, res) {
    try {
      const job = await JobVacancy.findByPk(req.params.id);
      if (!job) {
        return res.status(404).send('Job not found');
      }

      // Prepare job data
      const posterData = PosterService.prepareJobData(job);
      
      // Generate configuration
      const config = PosterService.generateConfig(job, req.query);
      
      // Render the poster view
      res.render('poster', { 
        job: {
          ...job.toJSON(),
          job_company_name: posterData.companyName,
          job_company_logo: posterData.companyLogo
        }, 
        config, 
        poster: posterData 
      });
    } catch (error) {
      console.error('Error generating poster:', error);
      res.status(500).send(error.message);
    }
  }

  /**
   * Get poster configuration (for API usage)
   */
  async getPosterConfig(req, res) {
    try {
      const job = await JobVacancy.findByPk(req.params.id);
      if (!job) {
        return res.status(404).json({ error: 'Job not found' });
      }

      const config = PosterService.generateConfig(job, req.query);
      res.json(config);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Preview different poster variations
   */
  async previewPosters(req, res) {
    try {
      const job = await JobVacancy.findByPk(req.params.id);
      if (!job) {
        return res.status(404).json({ error: 'Job not found' });
      }

      const posterData = PosterService.prepareJobData(job);
      
      // Generate multiple configurations for preview
      const previews = [];
      const seeds = [1, 2, 3, 4, 5]; // Different seeds for variety
      
      for (const seed of seeds) {
        // Temporarily override the seed generation
        const originalGetSeededRandom = PosterService.getSeededRandom;
        PosterService.getSeededRandom = () => seed;
        
        const config = PosterService.generateConfig(job, req.query);
        previews.push({
          seed,
          config,
          title: `Variation ${seed}`
        });
        
        // Restore original method
        PosterService.getSeededRandom = originalGetSeededRandom;
      }

      res.json({
        job: {
          ...job.toJSON(),
          job_company_name: posterData.companyName,
          job_company_logo: posterData.companyLogo
        },
        previews
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Generate poster with custom parameters
   */
  async generateCustomPoster(req, res) {
    try {
      const { id } = req.params;
      const {
        theme,
        layout,
        pattern,
        font,
        color
      } = req.query;

      const job = await JobVacancy.findByPk(id);
      if (!job) {
        return res.status(404).json({ error: 'Job not found' });
      }

      // Prepare job data
      const posterData = PosterService.prepareJobData(job);
      
      // Generate configuration with custom options
      const config = PosterService.generateConfig(job, {
        theme,
        layout,
        pattern,
        font,
        color
      });

      res.render('poster', { 
        job: {
          ...job.toJSON(),
          job_company_name: posterData.companyName,
          job_company_logo: posterData.companyLogo
        }, 
        config, 
        poster: posterData 
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new PosterController();