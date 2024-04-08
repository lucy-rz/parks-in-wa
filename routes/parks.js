const express = require('express');
const router = express.Router();
const parksCtrl = require('../controller/parks');
const ensureLoggedIn = require('../config/ensureLoggedIn');

router.get('/', parksCtrl.index);
router.get('/new', ensureLoggedIn, parksCtrl.new);
router.get('/:id', parksCtrl.show);
router.post('/', ensureLoggedIn, parksCtrl.create);

module.exports = router;