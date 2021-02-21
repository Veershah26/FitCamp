const admin = require("../utils/base");

const db = admin.firestore();

const users = db.collection("Users");

module.exports.create = async ({ fname, lname, email, uid }) => {
  const new_user = await users.doc(uid).create({ fname, lname, email });
  return new_user.id;
};

module.exports.newEntry = async ({
  uid,
  timeStamp,
  bodyFatPercentage,
  target,
  exercises,
}) => {
  await users
    .doc(uid)
    .collection("progress")
    .add({ timeStamp, bodyFatPercentage, target, exercises });
};

module.exports.getProgress = async (uid) => {
  const queryRef = await users
    .doc(uid)
    .collection("progress")
    .orderBy("timeStamp")
    .get();
  //console.log(queryRef.docs);
  return queryRef.docs.map((doc) => doc.data());
};
