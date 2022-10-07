const { Router } = require('express');
const { getAllClients, createClient, deleteUser, deleteClient } = require('../controllers/client');



const router = Router();


router.get('/',getAllClients)
router.post('/',createClient)
router.delete('/:id',deleteClient)



module.exports = router;