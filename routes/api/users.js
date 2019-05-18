const express = require('express');
const router = express.Router();
// express validatation
const { check, validationResult } = require('express-validator/check');

// test the route connection
// router.get('/',(req,res)=> res.send('user route'));

//route POST api/users
// desc Test route
// access public

router.post('/', [
    // this is to check the name, not and is empty is add as a solution for the name to be there and not empty
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please include a password with 6 or more characters').isLength({ min:6 })
    
],(req, res)=>{
    const errors = validationResult(req);
    // if there are error then return the res.status(400);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()});
    }
    console.log(req.body);
    res.send('User route');
});




module.exports = router;
