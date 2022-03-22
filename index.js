const express = require('express');
const app = express()
const cors = require('cors');
const mongoose = require('mongoose');
const NotesRouter = require('./Routes/Notes.routes');
const UsersRouter = require('./Routes/Users.routes');
const ResumeRouter = require('./Routes/Resume.routes');

const PORT = process.env.PORT || 80

app.use(express.json())
app.use(cors())
app.use('/', UsersRouter)
app.use('/notes', NotesRouter);
app.use('/resume', ResumeRouter);


async function start() {
    try {
        await mongoose.connect( "mongodb+srv://vshyrmanov:123456Mern@cluster0.itdad.mongodb.net/MERN?retryWrites=true&w=majority", {
            useNewUrlParser: true,
            useUnifiedTopology: true
            // useCreateIndex: true
        })
        console.log('bd started')
    }
    catch (e) {
        console.log("server error", e.message);
    }
}

start()

app.listen(PORT, () => {
    console.log('server started')
})

