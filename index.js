// CONSTANTS
const express = require("express")
const morgan = require("morgan")
const exphbs = require("express-handlebars")
const path = require("path")
const session = require("express-session")
const passport = require("passport")
const flash = require("connect-flash")
const multer = require("multer")

// INITIALIZATIONS
const app = express()
require("dotenv").config()
require("./database")
require("./config/passport")(passport)

// SETTINGS
app.set("port" , process.env.PORT || 3120)
app.set("views" , path.join(__dirname , "views"))
app.engine(".hbs" , exphbs({
    defaultLayout : "main" ,
    layoutsDir : path.join(app.get("views") , "layouts") ,
    partialsDir : path.join(app.get("views") , "partials") ,
    extname : ".hbs",
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
      }
}))
app.set("view engine" , "hbs")

// MIDDLEWARES
app.use(morgan("dev"))
app.use(express.urlencoded({extended : false}))
app.use(express.json())
const storage = multer.diskStorage({
    destination : path.join(__dirname , "public/images"),
    filename : (req , file , cb) => {
        cb(null , new Date().getTime() + path.extname(file.originalname))
    }
})
app.use(multer({storage}).single("file"))
app.use(session({
    secret : "secret" ,
    resave : true ,
    saveUninitialized : true
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

// GLOBAL VARIABLES
app.use((req , res , next) => {
    res.locals.success_msg = req.flash("success_msg")
    res.locals.error_msg = req.flash("error_msg")
    res.locals.error = req.flash("error")
    res.locals.user = req.user
    next()
})

// ROUTES
app.use(require("./routes/landingPageRouter"))
app.use(require("./routes/userRouter"))
app.use(require("./routes/savednewsRouter"))

// SERVER
app.listen(app.get("port") , () => {
    console.log("Server on port " + app.get("port"))
})