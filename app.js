require("dotenv").config();
require("./db");

const express = require("express");
const exphbs = require("express-handlebars");

// Handles the handlebars


// https://www.npmjs.com/package/hbs
const hbs = require("hbs");
const app = express();

require("./config")(app);
require("./config/session.config")(app)

const capitalize = require("./utils/capitalize");
const projectName = "PokeHack";
app.locals.appTitle = `${capitalize(projectName)}`;

app.use((req, res, next) => {
    app.locals.loggedUser = req.session.currentUser;
    app.locals.isAdmin = req.session.currentUser?.role == "ADMIN"
    next()
})

// 👇 Start handling routes here
const indexRoutes = require("./routes/index.routes");
app.use("/", indexRoutes);
//auth routes
const authRoutes = require("./routes/auth.routes");
app.use("/", authRoutes);
//user routes
const userRouter = require("./routes/user.routes")
app.use("/", userRouter)
//pokedex routes
const pokeRoutes = require("./routes/poke.routes");
app.use("/", pokeRoutes);
//events routes
const eventsRoutes = require("./routes/events.routes");
app.use("/", eventsRoutes)




require("./error-handling")(app);
module.exports = app;
