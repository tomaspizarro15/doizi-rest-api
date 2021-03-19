const express = require('express'); 
const {body , check} = require('express-validator');
const controller = require('../../controller/search')
const router = express.Router(); 

router.get('/' , controller.postSearchResult)

module.exports = router;