// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");
const exphbs = require("express-handlebars");

// Handles the handlebars


// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);
require("./config/session.config")(app)

// default value for title local
const capitalize = require("./utils/capitalize");
const projectName = "PokeHack";

app.locals.appTitle = `${capitalize(projectName)}`;

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


// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
