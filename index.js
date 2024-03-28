// LIBRARY
const express           = require("express")
const { PrismaClient }  = require("@prisma/client")
const bodyParser        = require("body-parser")
const cors              = require("cors")
const compression       = require("compression")
const cookieParser      = require("cookie-parser")

// ROUTES IMPORT
const apitest           = require("./app/routes/apitest.routes")
// const keyword           = require("./app/routes/keyword.routes")
// const skpi              = require("./app/routes/skpi.routes")
const users             = require("./app/routes/user.routes")

// APP CONFIGURATION
const app               = express()

var corsOptions = {
    origin: "*"
}

app.use(cors(corsOptions))

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: true }))

app.use(cookieParser())

app.use(compression())

// ROUTING
app.use("/test", apitest)
// app.use("/keyword", keyword)
// app.use("/skpi", skpi)
app.use("/users", users)

// APP PORT
app.listen(5000, () => {
    console.log("Running on port 5000")
})

module.exports = app