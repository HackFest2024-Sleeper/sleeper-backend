const admin = require('../../../config/firebase-config');
const { BadRequestError } = require('../../errors');
const User = require('../../../models').User;

const registerUser = async (req) => {
  const { uid, fullName, email } = req.body;

  const [user, created] = await User.findOrCreate({
    where: { uid: uid, email: email },
    defaults: {
      name: fullName,
    },
  });

  if (!created) {
    throw new BadRequestError('User already registered');
  }

  await admin.database().ref(`/${uid}/status`).set('off');

  return user;
};

module.exports = { registerUser };
