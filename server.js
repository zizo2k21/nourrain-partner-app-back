const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const apiRouter = require("./apiRouter");
const protectedRouter = require("./protectedRoutes");

const app = express();

const PORT = process.env.PORT || 5001;

app.use(express.json());
const corsOptions = {
  origin: true, // Allow all origins
  credentials: true, // Allow sending cookies with requests
};

app.use(cors(corsOptions));
app.use(cookieParser());

app.use("/protected", protectedRouter);
app.use("/auth", apiRouter);

// Handle unhandled routes
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

// Handle server errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "An error occurred on the server" });
});

app.listen(PORT, () => {
  console.log(`server is listening on ${PORT}`);
});

module.exports = app;
