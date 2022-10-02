const { Router } = require('express');
const { getRolesById, getRoles, createRole, getRolesByUserId, addRoleToUser } = require('../controllers/roles');






const router = Router();

router.get('/:id',getRolesByUserId);
router.get('/',getRoles);
router.post('/',createRole)
router.post('/user-role',addRoleToUser)





module.exports = router;