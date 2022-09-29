const { Router } = require('express');
const { createUser, getUser, getUserByID } = require('../controllers/user');


const router = Router();

router.post('/',createUser);
router.get('/',getUser)
router.get('/:document',getUserByID)




module.exports = router;