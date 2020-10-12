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
const PORT = process.env.PORT || 3000
const MONGO_URI = process.env.MONGO_URI
// SERVER UTILITIES
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
// INITIALIZE MONGO CONNECTION
mongoose.connect(MONGO_URI, MongoDBConfig, () => {
   console.log("✔ MongoDB database is connection")
})

db.on("error", console.error.bind(console, "❌ Connection error: "))
db.on(
   "ready",
   console.error.bind(console, "✔ Database connected successfully ")
)
app.listen(PORT, () => {
   console.log(`✔ Our server is running on http://localhost:${PORT}`)
})

app.get("/",(req,res)=>{
   res.send("Hello world")
})
