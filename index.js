if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}
// DATABASE SETUP
const { mongoose, db } = require("./utils/mongoose");
const MongoDBConfig = require("./configs/mongodb.config");
// EXPRESS
const express = require("express")
const app = express()
    // CONST
const PORT = process.env.PORT || 3001
const MONGO_URI = process.env.MONGO_URI
    // SERVER UTILITIES
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
    // ROUTERS
const ApiRoute = require('./routes/api')
const AuthRoute = require('./routes/auth')

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
    // INITIALIZE MONGO CONNECTION
mongoose.connect(MONGO_URI, MongoDBConfig, () => {
    console.log("✔ MongoDB database is connected")
})

db.on("error", console.error.bind(console, "❌ Connection error: "))
app.listen(PORT, () => {
    console.log(`✔ Our server is running on http://localhost:${PORT}`)
})

// ROUTES
app.use('/api', ApiRoute)
app.use('/', AuthRoute)

// ERROR HANDLING MIDDLEWARE
app.use((err, req, res, next) => {
    res.status(422).send({
        error: err.message
    })
})

// DEFAULT VIEW
app.get("/", (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})