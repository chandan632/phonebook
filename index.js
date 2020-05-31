const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const path = require("path")
const Contacts = require("./model")


const app = express()

// PORT
const port = process.env.PORT || 3001

dotenv.config()

// Middleware
app.use(express.json())
app.use(cors())

// DB connection
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log("Connected to DB")
})

app.post("/addcontact", async (req, res) => {
    try {
        const contact = new Contacts(req.body)
        const savedContact = await contact.save()
        res.status(200).json({
            status: "Data saved"
        })
    } catch{
        err => {
            res.status(500).json({
                message: err.message
            })
        }
    }
    console.log(req.body)
})

app.get("/contacts", async (req, res) => {
    try {
        const contacts = await Contacts.find()
        res.status(200).json({
            contacts
        })
    } catch {
        err => {
            res.status(500).json({
                message: err.message
            })
        }
    }
})

app.get("/contact", async (req, res) => {
    try {
        const contacts = await Contacts.find()
        res.status(200).json({
            contacts
        })
    } catch {
        err => {
            res.status(500).json({
                message: err.message
            })
        }
    }
})

app.get("/deletecontact", async (req, res) => {
    try {
        id = req.query.id
        const deletedContact = await Contacts.findByIdAndDelete({ _id: id })
        if (deletedContact) {
            res.status(200).json({ status: "Contact deleted successfully!" })
        } else {
            res.status(500).json({ message: "Something went wrong" })
        }
    } catch{
        err => {
            res.json({
                message: err.message
            })
        }
    }
})

app.post("/editcontact", async (req, res) => {
    try {
        const id = req.query.id
        const editedContact = await Contacts.findByIdAndUpdate({ _id: id }, req.body, { new: true })
        if (editedContact) {
            res.status(200).json({ status: "contact updated successfully" })
        } else {
            res.status(500).json({ message: "Something went wrong" })
        }
    } catch{
        err => {
            res.json({
                message: err.message
            })
        }
    }
})

app.get("/editcontactdata", async (req, res) => {
    try {
        const id = req.query.id
        const data = await Contacts.findById({ _id: id })
        if (data) {
            res.status(200).json({ data })
        } else {
            res.status(500).json({ message: "something went wrong" })
        }
    } catch{
        err => {
            res.status(500).json({
                message: err.message
            })
        }
    }
})

if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'client', 'build')))
    // Handle React routing, return all requests to React app
    app.get('*', (request, response) => {
        response.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

app.listen(port, () => console.log(`server up and running on ${port}`))