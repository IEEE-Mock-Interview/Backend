const express = require('express');
const InterviewController = require('../controllers/interview.controller')
const router = express.Router();

/**
 * @description get all Interviews
 */
router.get('/', InterviewController.getInterviews);

/**

/**
 * @description update Interview
 */
router.put('/:interviewId', InterviewController.updateInterview);

/**
 * @description create Interview
 */
router.post('/', InterviewController.createInterview);


/**
 * @description delete Interview
 */
router.delete('/:interviewId', InterviewController.deleteInterview);


router.all('*', (req, res) => {
	res.status(404).json({ status: 404, message: 'Not found' });
});

module.exports = router;
