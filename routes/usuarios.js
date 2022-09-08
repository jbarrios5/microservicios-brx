const { Router } = require('express');
const { createUser } = require('../controllers/usuarios');






const router = Router();

router.post('/',createUser);




module.exports = router;