const { Router } = require('express');
const { getRolesById } = require('../controllers/roles');






const router = Router();

router.get('/:id',getRolesById);




module.exports = router;