const express = require('express');
const router = express.Router();

// test the route connection
// router.get('/',(req,res)=> res.send('user route'));

//route POST api/users
// desc Test route
// access public

router.post('/',(req, res)=>{
    console.log(req.body);
    res.send('User route');
})




module.exports = router;
