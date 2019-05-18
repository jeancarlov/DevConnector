const express = require('express');
const router = express.Router();

//route GEt api/auth
// desc Test route
// access public
router.get('/',(req,res)=> res.send('auth route'));


module.exports = router;
