const express = require('express');
const router = express.Router();
const jobVacancyController = require('../controllers/jobVacancyController');
const posterController = require('../controllers/PosterController');

// Special routes
router.get('/for-you', jobVacancyController.getForYouJobs);
router.get('/explore', jobVacancyController.getExploreJobs);
router.get('/latest-input', jobVacancyController.getLatestInput);

// CRUD routes
router.post('/', jobVacancyController.createJob);
router.get('/', jobVacancyController.getAllJobs);
router.get('/:id', jobVacancyController.getJob);
router.put('/:id', jobVacancyController.updateJob);
router.delete('/:id', jobVacancyController.deleteJob);

// Poster routes
router.get('/:id/poster', posterController.getJobPoster);
router.get('/:id/poster/config', posterController.getPosterConfig);
router.get('/:id/poster/preview', posterController.previewPosters);
router.get('/:id/poster/custom', posterController.generateCustomPoster);


module.exports = router;
