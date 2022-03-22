const Routes = require('express');
const {Router} = require("express");
const router = Router()
const auth = require('../middleware/middleware.auth');
const controller = require('../Controllers/Resume.controllers');

router.post('/create', auth, controller.create)
router.get('/getAll', auth, controller.getAll)
router.put('/update', auth, controller.update)
router.delete('/remove', auth, controller.remove)

module.exports = router;