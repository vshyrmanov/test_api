const Resume = require('../Models/Resume.models');
const Users = require("../Models/Users.models");

const resumeControllers = {
    create: async (req, res) => {
        try {
            const temp = req.body
            const data = Resume.create({...temp, owner: req.user.userId})
            res.json(data)
        } catch (e) {
            console.log(e)
        }
    },
    getAll: async (req, res) => {
        try {
            const data = await Resume.find({owner: req.user.userId})
            const user = await Users.findById(req.user.userId)
            res.json({username: user.username, data})
        } catch (e) {

        }
    },
    update: async (req, res) => {
        try {
            const data = req.body
            const updateData = await Resume.findByIdAndUpdate(data._id, data, {new: true})
            res.json(updateData)
        } catch (e) {
            console.log(e)
        }
    },
    remove: async (req, res) => {
        try {
            const {id} = req.params
            const data = await Resume.findByIdAndDelete(id)
            res.json(data)
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = resumeControllers;