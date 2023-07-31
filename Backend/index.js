import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors";

import authRoute from "./routes/auths.js"
import hotelsRoute from "./routes/hotels.js"
import roomsRoute from "./routes/rooms.js"
import usersRoute from "./routes/users.js"

dotenv.config()
const app = express();

const connect = () => {
    try {
        mongoose.connect(process.env.MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true, 
            useFindAndModify: false,
        })
    } catch (err) {
        throw err
    }
}

app.get('/', (req, res) => {
    res.send("hello")
})

mongoose.connection.on("disconnected", ()=> {
    console.log("mongoDB disconnected");
})

// Middlewares
// cors middleware
app.use (cors());
// cookies middleware
app.use(cookieParser())
// json requests middleware
app.use(express.json())

// routes middlewares
app.use("/api/auth", authRoute)
app.use("/api/users", usersRoute)
app.use("/api/hotels", hotelsRoute)
app.use("/api/rooms", roomsRoute)


//error handler middleware
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong"
    return res.status(errorStatus).json(
        {
            success: false,
            status: errorStatus,
            message: errorMessage,
            stack: err.stack // more error details
        }
    )
})

app.listen(8800, () => {
    connect()
    console.log("connected to 8800")
})
