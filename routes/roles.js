const { Router } = require('express');
const { getRolesById, getRoles, createRole, getRolesByUserId, addRoleToUser, updateUserRole } = require('../controllers/roles');






const router = Router();

router.get('/:id',getRolesByUserId);
router.get('/',getRoles);
router.post('/',createRole)
router.post('/user-role',addRoleToUser)
router.put('/user-role',updateUserRole)





module.exports = router;