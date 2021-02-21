require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const config = require("./utils/config");

const userRoutes = require("./routes/user.routes");

const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));

app.use("/api/user", userRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send({ statusCode: 500, msg: err.message });
});

app.listen(config.PORT, () =>
  console.log(`Server running on port ${config.PORT}`)
);
