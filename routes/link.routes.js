const {Router} = require('express');
const Link = require('../models/link');
const config = require('config');
const shortId = require('shortid');
const auth = require('../middleware/auth.middleware');
const {validationResult} = require("express-validator");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const router = Router();

router.post('/generate', auth, async (req, res) => {
    try {
        const baseUrl = config.get('baseUrl');
        const {from} = req.body

        const code = shortId.generate();

        const existing = await Link.findOne({from})

        if (existing) {
            res.json({link: existing})
        }

        const to = baseUrl + '/t/' + code

        const link = new Link({
            code, to, from, owner: req.user.userId
        })

        await link.save()

        res.status(200).json({link})

    } catch (e) {
        res.status(500).json({message: "something goes wrong"})
    }
})

router.get('/', auth, async (req, res) => {
    try {
        const links = await Link.find({owner: req.user.userId})
        res.json(links)
    } catch (e) {
        res.status(500).json({message: "something goes wrong"})
    }
})

router.get('/:id', auth, async (req, res) => {
    try {

        const link = await Link.findById(req.params.id)
        res.json(link)
    } catch (e) {
        res.status(500).json({message: "something goes wrong"})
    }
})

router.post('/remove/:id', auth, async (req, res) => {
    try {
        await Link.deleteOne({
            _id: req.params.id,
        })
    } catch (e) {
        console.log(e)
        res.status(500).json({message: "something goes wrong"})
    }

})

module.exports = router;