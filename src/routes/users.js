const express = require('express');
const controller = require('../controllers/users');
const {auth} = require("../helpers/auth");

const router = express.Router();

router.post('/create', controller.create);

router.post('/update', auth, controller.update);

router.get('/get', auth, controller.read);

router.get('/bookmark/:id', auth, controller.bookmark);

router.get('/auth/:email/:password', controller.authenticate);

module.exports = router;
//npx express-generator