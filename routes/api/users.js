const express = require('express');
const router = express.Router();

//route GEt api/users
// desc Test route
// access public
router.get('/',(req,res)=> res.send('user route'));


module.exports = router;
