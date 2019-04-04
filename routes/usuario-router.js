'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../controllers/usuario-controller');
const auth = require('../middlewares/authenctication');

let _crt = new controller();

router.post('/autenticar', _crt.autenticar)
router.post('/register', _crt.post);

router.get('/', auth, _crt.get);

router.get('/:id', auth, _crt.getById);

router.post('/', auth, _crt.post);

router.put('/:id', auth, _crt.put);

router.delete('/:id', auth, _crt.delete);

module.exports = router;