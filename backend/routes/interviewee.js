const express = require('express');
const IntervieweeController = require('../controllers/interviewee.controller')
const router = express.Router();

/**
 * @description get all Interviewees
 */
router.get('/', IntervieweeController.getInterviewees);

/**

/**
 * @description update Interviewee
 */
router.put('/:intervieweeId', IntervieweeController.updateInterviewee);

/**
 * @description create Interviewee
 */
router.post('/', IntervieweeController.createInterviewee);


/**
 * @description delete Interviewee
 */
router.delete('/:intervieweeId', IntervieweeController.deleteInterviewee);

/**
 * @description update Interviewee
 */
router.put('/volunteer/:intervieweeId', IntervieweeController.updateIntervieweeVolunteer);


router.all('*', (req, res) => {
	res.status(404).json({ status: 404, message: 'Not found' });
});

module.exports = router;
