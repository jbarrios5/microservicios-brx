const { Router } = require('express');
const { createUser, getUser, getUserByID, deleteUser, updateUser } = require('../controllers/user');


const router = Router();

router.post('/',createUser);
router.get('/',getUser)
router.get('/:document',getUserByID)
router.delete('/:id',deleteUser)
router.put('/:id',updateUser)





module.exports = router;