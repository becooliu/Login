'use strict'

const express = require('express');
const router = express.Router();

router.post('/uploadImg/getImg' , (req, res) => {
    console.log(req.body);
})

module.exports = router;