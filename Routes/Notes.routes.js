const {Router} = require('express');
const controller = require('../Controllers/Notes.controllers');
const router = Router();
const auth = require('../middleware/middleware.auth');

router.get('/getAll', auth, controller.getAll)
router.get('/getOne/:id', auth, controller.getOne)
router.post('/create', auth, controller.create)
router.put('/update', auth, controller.update)
router.delete('/remove/:id', auth, controller.remove)

module.exports = router