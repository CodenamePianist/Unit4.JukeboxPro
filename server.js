require("dotenv").config();

const express = require("express");
const app = express();
const PORT = 3000;

// Processing middleware
app.use(require("morgan")("dev"));
app.use(express.json());

// Router middleware
//app.use(require("./api/auth").router);
//app.use("/playlists", require("./api/playlists"));
app.use("/tracks", require("./api/tracks"));

// 404 middleware
app.use((req, res, next) => {
  next({ status: 404, message: "Endpoint not found." });
});

// Error-handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status ?? 500);
  res.message(err.message ?? "Sorry, something broke.");
});

// Listen...
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
