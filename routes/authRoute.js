const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const router = require('express').Router();

// Route for signing up
router.post('/signup',(req, res) => {
    console.log(req.body);
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10)
    });
    user.save((err, user) => {
        if (err) {
            res.status(500).send({err: 'This email is already registered'});
        } else {
            res.status(200).send({user: true, message: 'user created successfully'});
        }
    })
} )

// Route for login
router.post('/login', (req, res) => {
    console.log(req.body);
    User.findOne({email: req.body.email}, (err, user) => {
        if (err) {
            res.status(500).send({err: 'Something went wrong'});
        } else if (!user) {
            res.status(401).send({err: 'You need to register First'});
        } else {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                const token = jwt.sign(JSON.stringify({username : user.username,email: user.email}) ,'secret');

                res.status(200).send({user: true, message: 'Login successful',token: token});
            } else {
                res.status(401).send({err: 'Invalid email or password'});
            }
        }
    })
})


module.exports = router;