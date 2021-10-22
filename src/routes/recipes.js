const express = require('express');
const router = express.Router();
const {auth} = require("../helpers/auth");

const controller = require("../controllers/recipes");

/* GET users listing. */
router.get('/read/:id', controller.get);

router.get('/find/:term', controller.find);

router.post('/post', auth, controller.post);

router.get('/tags', controller.tags);


module.exports = router;
//npx express-generator