const User = require('../../../models').users;

const registerUser = async (req) => {
  const { uid, fullName, email } = req.body;

  const user = await User.create({
    uid: uid,
    name: fullName,
    email: email,
  });

  return user;
};

module.exports = { registerUser };
