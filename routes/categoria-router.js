'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../controllers/categoria-controller');
const auth = require('../middlewares/authenctication');

let _crt = new controller();

router.get('/', auth, _crt.get);

router.get('/:id', auth, _crt.getById);

router.post('/', auth, _crt.post);

router.put('/:id', auth, _crt.put);

router.delete('/:id', auth, _crt.delete);

module.exports = router;