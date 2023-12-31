const express = require("express");
//const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
// const session = require("express-session");
// const passport = require("passport");
// const passportConfig = require("./config/passport");
const db = require("./config/db");
const models = require("./app");
const sudokuFactory = require("./services/sudokuFactory");
sudokuFactory().then((sudoku) => console.log("sudoku", sudoku));

const app = express();

//app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());

app.set("trust proxy", 1);
/*
app.use(
  session({
    secret: "user",
    resave: true,
    saveUninitialized: false,
    cookie: {
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      secure: process.env.NODE_ENV === "production",
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

passport.use(passportConfig.localStrategyInstance);
passport.serializeUser(passportConfig.serializeUserCb);
passport.deserializeUser(passportConfig.deserializeUserCb);
*/
app.use(
  cors({
    credentials: true,
    origin: [process.env.FRONTEND_APP_URL],
  })
);

app.use("/", (req, res) => {
  res.sendStatus(404);
});

app.use((err, req, res, next) => {
  res.status(500).send(err.message);
});

const PORT = process.env.PORT || 3001;

db.sync({ force: false }).then(() =>
  app.listen(PORT, () => console.log(`Listening port ${PORT}`))
);
