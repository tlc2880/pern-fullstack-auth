const express = require('express')
const app = express()
const { PORT, CLIENT_URL } = require('./constants');
const cookieParser = require('cookie-parser')
const passport = require('passport')
const cors = require('cors');

// import passport middleware
require('./middlewares/passport-middleware')
 
// initialize middlewares
app.use(express.json())
app.use(cookieParser())
app.use(cors({ origin: CLIENT_URL, credentials: true}))
app.use(passport.initialize())
app.use(express.static("public"));

// import routes
const authRoute = require('./routes/auth.route');
const todosRoute = require("./routes/todos.route");
const eComRoute = require("./routes/eCom.route");
const shopRoute = require("./routes/shop.route");

// initialize routes
app.use('/', authRoute);
app.use("/", todosRoute);
app.use("/", eComRoute);
app.use("/", shopRoute);

const appStart = () => {
    try {
        app.listen(PORT, () => {
            console.log(`The app is running at http://localhost:${PORT}`)
        })
    } catch (error) {
        console.log(`Error: ${error.message}`)
    }
}

appStart();