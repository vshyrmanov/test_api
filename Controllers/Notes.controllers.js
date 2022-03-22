const Notes = require("../Models/Notes.models");
const Users = require("../Models/Users.models");

const notesControllers = {
    getAll: async (req, res) => {
        const data = await Notes.find({owner: req.user.userId})
        const user = await Users.findById(req.user.userId)
        res.json({username: user.username, data})
    },
    getOne: async (req, res) => {
      try {
          const {id} = req.params
          const data = await Notes.findById(id)
          res.json(data)
      }  catch (e) {
          console.log(e)
      }
    },
    create: async (req, res) => {
        try {
            const temp = req.body
            const data = await Notes.create({...temp, owner: req.user.userId})
            res.json(data)
        } catch (e) {
            console.log(e)
        }
    },
    update: async (req, res) => {
        try {
            const data = req.body
            const updateData = await Notes.findByIdAndUpdate(data._id, data, {new: true})
            res.json(updateData)
        } catch (e) {
            console.log(e)
        }
    },
    remove: async (req, res) => {
        try {
            const {id} = req.params
            const data = await Notes.findByIdAndDelete(id)
            res.json(data)
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = notesControllers;