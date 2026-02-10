if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");

const listingRouter = require("./routers/listing.js");
const reviewRouter = require("./routers/review.js");
const userRouter = require("./routers/user.js");
const profileRouter = require("./routers/profile.js");

const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

/* ================= DATABASE ================= */
const DB_URL = process.env.MONGO_URL;

async function main() {
  await mongoose.connect(DB_URL);
  console.log("connected to DB");
}
main().catch(err => console.log(err));

/* ================= SERVER ================= */
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

/* ================= VIEW ENGINE ================= */
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

/* ================= MIDDLEWARE ================= */
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

/* ================= SESSION ================= */
const store = MongoStore.create({
  mongoUrl: DB_URL,
  crypto: { secret: process.env.SECRET },
  touchAfter: 24 * 3600
});

const sessionOptions = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000
  }
};

app.use(session(sessionOptions));
app.use(flash());

/* ================= PASSPORT ================= */
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

/* ================= LOCALS ================= */
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;

  // ⭐ THIS LINE FIXES MAPBOX
  res.locals.MAP_TOKEN = process.env.MAP_TOKEN;

  next();
});

/* ================= ROUTES ================= */
app.get("/", (req, res) => {
  res.redirect("/listings");
});

app.use("/", userRouter);
app.use("/profile", profileRouter);
app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);

/* ================= ERROR HANDLING ================= */
app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found!"));
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong!" } = err;
  res.status(statusCode).render("listings/error.ejs", { message });
});
