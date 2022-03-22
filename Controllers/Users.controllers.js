const Users = require('../Models/Users.models');
const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const Notes = require("../Models/Notes.models");


const controller = {
    register: async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Password must be at least 6 characters, username must be at least 2 characters",
                })
            }

            const {username, password} = req.body

            const candidate = await Users.findOne({username})

            if (candidate) {
                return res.status(400).json({message: "Such user is already created"})
            }

            const hashedPassword = await bcrypt.hash(password, 12)
            const user = new Users({username, password: hashedPassword})

            await user.save()
            res.status(200).json({message: "User was created successfully"})
        } catch (e) {
            res.status(500).json({message: "something goes wrong"})
        }
    },
    login: async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Password must be at least 6 characters, username must be at least 2 characters",
                })
            }

            const {username, password} = req.body

            const user = await Users.findOne({username})

            if (!user) {
                return res.status(400).json({message: "User not found"})
            }

            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) {
                return res.status(400).json({message: "Incorrect password, try again"})
            }

            const token = jwt.sign(
                {userId: user.id},
                config.get('jwtSecret'),
                {expiresIn: '24h'}
            )
            res.json({token, userId: user.id, username: user.username})

        } catch (e) {
            res.status(500).json({message: "something goes wrong"})
        }
    }
}

module.exports = controller;