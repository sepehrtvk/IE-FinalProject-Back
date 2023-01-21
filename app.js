const express = require("express");
const morgan = require("morgan");

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const axios = require("axios");
const app = express();

const cron = require("node-cron");

const Urls = require("./models/urlsModel");
const Request = require("./models/requestModel");

dotenv.config({ path: "./config.env" });

const db = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(db)
  .then(() => console.log("succesfull"))
  .catch((err) => console.log(err));

const userRouter = require("./routes/userRoutes");
const requestRouter = require("./routes/requestRoutes");
const urlsRouter = require("./routes/urlsRoutes");

// cron.schedule("* * * * *", async () => {
//   const allUrls = await Urls.find();

//   allUrls.map((url) => {
//     axios
//       .get(url.endPoint)
//       .then(async function (response) {
//         // handle success
//         const statusCode = response.status;
//         const statusText = response.statusText;

//         const newRequest = await Request.create({
//           url: url.endPoint,
//           statusText: statusText,
//           statusCode: statusCode,
//           errorCount: 0,
//         });

//         console.log(newRequest);
//       })
//       .catch(async function (error) {
//         // handle error
//         if (error.response) {
//           const statusText = error.response.statusText;
//           const statusCode = error.response.status;

//           const newRequest = await Request.create({
//             url: url.endPoint,
//             statusText: statusText,
//             statusCode: statusCode,
//             errorCount: 1,
//           });

//           console.log(newRequest);
//         }
//       });
//   });
// });

// MIDDLEWARES
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST,OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

// ROUTES
app.use("/api/v1/users", userRouter);
app.use("/api/v1/requests", requestRouter);
app.use("/api/v1/urls", urlsRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

module.exports = app;
