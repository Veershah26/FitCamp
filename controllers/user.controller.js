const chalk = require("chalk");
const User = require("../models/User");
const csv = require("csv-parser");
const fs = require("fs");

module.exports.register = async (req, res, next) => {
  try {
    const { fname, lname, email, uid } = req.body;
    console.log(chalk.yellow("Creating user..."));
    const user_id = await User.create({ fname, lname, email, uid });
    console.log(chalk.green("Created!"));

    res.status(200).send({
      statusCode: 200,
      msg: "Successfully created user!",
      data: { user_id },
    });
  } catch (e) {
    next(e);
  }
};

function getRandom(arr, n) {
  var result = new Array(n),
    len = arr.length,
    taken = new Array(len);
  if (n > len)
    throw new RangeError("getRandom: more elements taken than available");
  while (n--) {
    var x = Math.floor(Math.random() * len);
    result[n] = arr[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
}

module.exports.analyse = async (req, res, next) => {
  try {
    const results = [];
    const { uid, bodyFatPercentage, target } = req.body;
    //TODO:Get exercises
    fs.createReadStream("data.csv")
      .pipe(csv({ separator: ";" }))
      .on("data", (data) => results.push(data))
      .on("end", async () => {
        const exercises = getRandom(results, 5);
        console.log(chalk.yellow("Adding a new entry..."));
        await User.newEntry({
          uid,
          timeStamp: new Date().getTime(),
          bodyFatPercentage,
          target,
          exercises,
        });
        console.log(chalk.green("Done!"));
        res.status(200).send({
          statusCode: 200,
          msg: "Successfully added new entry",
          data: {
            exercises,
          },
        });
      });
  } catch (e) {
    next(e);
  }
};

module.exports.getProgress = async (req, res, next) => {
  try {
    const { uid } = req.query;
    const progress = await User.getProgress(uid);
    res.status(200).send({
      statusCode: 200,
      msg: "Successfully retrieved progress",
      data: { progress },
    });
  } catch (e) {
    next(e);
  }
};
