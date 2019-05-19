const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
// express validatation
const { check, validationResult } = require("express-validator/check");

const User = require("../../models/User");

// test the route connection
// router.get('/',(req,res)=> res.send('user route'));

//route POST api/users
// desc Test route
// access public

router.post(
  "/",
  [
    // this is to check the name, not and is empty is add as a solution for the name to be there and not empty
    check("name", "Name is required")
      .not()
      .isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please include a password with 6 or more characters"
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    // if there are error then return the res.status(400);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // uses destruction to full several variables from req.body
    const { name, email, password } = req.body;

    try {
      // see if user exist
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "user already exist" }] });
      }

      // Get users gravatar
      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm"
      });
      // -----This creates a new  user instance------
      user = new User({
        name,
        email,
        avatar,
        password
      });

      // ------ hash password ----
      // Encript password using bcrypt by creating a salt to do the hashing
      const salt = await bcrypt.genSalt(10);
      //now take the user password and hash it
      user.password = await bcrypt.hash(password, salt);
      // ----- save the user in the database ----
      await user.save();

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
