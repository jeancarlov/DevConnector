const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth')
const User = require('../../models/User')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
// express validatation
const { check, validationResult } = require("express-validator/check");

//route GEt api/auth
// desc Test route
// access public
router.get('/', auth, (req, res)=> res.send('auth route'));

// use try catch to make a call to database, use asynch await
router.get('/', auth, async (req, res)=> {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user)
    } catch (error) {
        console.log(err.message);
        res.status(500).send('Server Error')
        
    }
});


//route POST api/auth
// desc Test route
// access public

router.post(
    "/",
    [
      // this is to check the name, not and is empty is add as a solution for the name to be there and not empty 
      check("email", "Please include a valid email").isEmail(),
      check(
        "password",
        "Password is required").exists()
    ],
    async (req, res) => {
      const errors = validationResult(req);
      // if there are error then return the res.status(400);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      // uses destruction to full several variables from req.body
      const { email, password } = req.body;
  
      try {
        // see if user exist
        let user = await User.findOne({ email });
        if (!user) {
          return res
            .status(400)
            .json({ errors: [{ msg: "Invalid Credentials" }] });
        }
  
        //use bcrypt compare to see if the text and token is a match
        const isMatch = await bcrypt.compare( password, user.password);

        if (!user) {
            return res
              .status(400)
              .json({ errors: [{ msg: "Invalid Credentials" }] });
          } 
        

        // Return jsonwebtoken for user to login right away
        // create payload with an obj and a user id
        const payload = {
          user: {
            id: user.id
          }
        };
        // -- sign token , pass the payload, pass secrect, expiration, and callback.
        jwt.sign(
           payload,
           config.get('jwtSecret'),
           { expiresIn: 360000 },
           (err, token)=>{
               if(err) throw err;
               res.json({token});
           }
           );
      } catch (err) {
        console.log(err.message);
        res.status(500).send("server error");
      }
    }
  );
  

module.exports = router;
