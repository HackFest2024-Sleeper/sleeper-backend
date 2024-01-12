const User = require('../../../models').User;

const registerUser = async (req) => {
  const { uid, fullName, email } = req.body;

  const user = await User.create({
    uid: uid,
    name: fullName,
    email: email,
  });

  await admin.database().ref(`/${uid}`).set('off');

  return user;
};

module.exports = { registerUser };
