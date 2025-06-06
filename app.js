const ejsMate = require("ejs-mate");
const express = require("express");
const Joi = require("joi");
const ErrorHandler = require("./utils/errorHandler");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const wrapAsync = require("./utils/wrapAsync");
const path = require("path");
const app = express();

// Models
const Place = require("./models/place");
const { error } = require("console");

// Schemas
const { placeSchema } = require("./schemas/place");

mongoose
  .connect("mongodb://127.0.0.1/rate-the-place")
  .then((result) => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.log(err);
  });

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// Validate Place Middleware
const validatePlace = (req, res, next) => {
  const { error } = placeSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    return next(new ErrorHandler(msg, 400));
  } else {
    next();
  }
};

app.get("/", (req, res) => {
  res.render("home");
});

app.get(
  "/places",
  wrapAsync(async (req, res) => {
    const places = await Place.find();
    res.render("places/index", { places });
  })
);

app.get("/places/add", (req, res) => {
  res.render("places/add");
});

app.post(
  "/places",
  validatePlace,
  wrapAsync(async (req, res, next) => {
    const { error } = placeSchema.validate(req.body);
    if (error) {
      console.log(error);
      return next(new ErrorHandler(error, 400));
    }

    const place = new Place(req.body.place);
    await place.save();
    res.redirect("/places");
  })
);

app.get(
  "/places/:id",
  wrapAsync(async (req, res) => {
    const place = await Place.findById(req.params.id);
    res.render("places/show", { place });
  })
);

app.get(
  "places/:id/edit",
  wrapAsync(async (req, res) => {
    const place = await Place.findById(req.params.id);
    res.render("places/edit", { place });
  })
);

app.get(
  "/places/:id/edit",
  wrapAsync(async (req, res) => {
    const place = await Place.findById(req.params.id);
    res.render("places/edit", { place });
  })
);

app.put(
  "/places/:id",
  validatePlace,
  wrapAsync(async (req, res) => {
    await Place.findByIdAndUpdate(req.params.id, { ...req.body.place });
    res.redirect("/places");
  })
);

app.delete(
  "/places/:id",
  wrapAsync(async (req, res) => {
    await Place.findByIdAndDelete(req.params.id);
    res.redirect("/places");
  })
);

app.all("*", (req, res, next) => {
  next(new ErrorHandler("The page is not found", 404));
});

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "Sorry, something went wrong!";
  res.status(statusCode).render("error", { err });
});

app.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000`);
});
