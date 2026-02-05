const express = require('express');
const router = express.Router();
const jobVacancyController = require('../controllers/jobVacancyController');

// Special routes
router.get('/for-you', jobVacancyController.getForYouJobs);
router.get('/explore', jobVacancyController.getExploreJobs);
router.get('/latest-input', jobVacancyController.getLatestInput);

// CRUD routes
router.post('/', jobVacancyController.createJob);
router.get('/', jobVacancyController.getAllJobs);
router.get('/:id/poster', jobVacancyController.getJobPoster);
router.get('/:id', jobVacancyController.getJob);
router.put('/:id', jobVacancyController.updateJob);
router.delete('/:id', jobVacancyController.deleteJob);


module.exports = router;
