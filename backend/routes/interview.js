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

/**
 * @description get all Interviews
 */
router.get('/volunteer/:panelId', InterviewController.getInterviewsOfAssignedPanel);

/**
 * @description get all Interviews
 */
router.put('/volunteer/:interviewId', InterviewController.updateInterviewOfAssignedPanel);

/**
 * @description get all Interviews
 */
router.put('/panel/:interviewId', InterviewController.updateAssignedInterview);

/**
 * @description get all Interviews
 */
router.get('/panel/:panelId', InterviewController.getAssignedInterviews);


router.all('*', (req, res) => {
	res.status(404).json({ status: 404, message: 'Not found' });
});

module.exports = router;
