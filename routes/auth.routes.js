const {Router} = require('express');
const bcrypt = require('bcryptjs');
const {check, validationResult} = require('express-validator');
const router = Router()
const config = require('config');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

router.post(
    '/register',
    [
        check('email', 'Incorrect email').isEmail(),
        check('password', 'Min 6 symbols').isLength({min: 6})
    ],
    async (req,res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Incorect validataion data"
                })
            }

            const {email, password} = req.body

            const candidate = await User.findOne({email})

            if (candidate) {
                return res.status(400).json({message: "Such user is allready created"})
            }

            const hashedPassword = await bcrypt.hash(password, 12)
            const user = new User({email, password: hashedPassword})

            await user.save()
            res.status(200).json({message: "User was created successfully"})
        } catch (e) {
            res.status(500).json({message: "something goes wrong"})
        }
})
router.post('/login',
    [
        check('email', 'Enter correct email').normalizeEmail().isEmail(),
        check('password', 'Enter correct password').exists()
    ],
    async (req,res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: "Incorect validataion data with login"
            })
        }

        const {email, password} = req.body

        const user = await User.findOne({email})

        if (!user) {
            return res.status(400).json({message: "User not found"})
        }

        const isMatch = await bcrypt.compare( password, user.password)

        if (!isMatch) {
            return res.status(400).json({message: "Incorrect password, try again"})
        }

        const token = jwt.sign(
            {userId: user.id},
            config.get('jwtSecret'),
            {expiresIn: '1h'}
        )
        res.json({token, userId: user.id})


    } catch (e) {
        res.status(500).json({message: "something goes wrong"})
        console.log('tyt')
    }
})

module.exports = router;
