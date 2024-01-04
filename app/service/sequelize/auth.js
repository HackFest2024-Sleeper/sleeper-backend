const admin = require('../../../config/firebase-config');
const validator = require('validator');
const { sequelize } = require('../../../models');
const { BadRequestError } = require('../../errors');
const User = require('../../../models').users;

const createUser = async (email, password, name) => {
  let firebaseUser, sequelizeUser;
  try {
    firebaseUser = await admin.auth().createUser({
      email: email,
      password: password,
      displayName: name,
    });
    const result = await sequelize.transaction(async (t) => {
      sequelizeUser = await User.create(
        {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          name: firebaseUser.displayName,
        },
        {
          transaction: t,
        }
      );
      return sequelizeUser;
    });
    return result;
  } catch (err) {
    if (firebaseUser) {
      await admin.auth().deleteUser(firebaseUser.uid);
    }
    throw err;
  }
};

const registerUser = async (req) => {
  const { name, email, password } = req.body;
  let firebaseUser;

  if (!name || !email || !password) {
    throw new BadRequestError('name, email, and password is required');
  }

  const isEmail = await validator.isEmail(email);
  if (!isEmail) {
    throw new BadRequestError('Invalid Email');
  }

  try {
    firebaseUser = await admin.auth().getUserByEmail(email);
    if (firebaseUser) {
      const providerId = firebaseUser.providerData[0].providerId;
      if (providerId === 'google.com') {
        const [user, created] = await User.findOrCreate({
          where: {
            uid: firebaseUser.uid,
            name: firebaseUser.displayName,
            email: firebaseUser.email,
          },
        });

        if (created) {
          return {
            msg: `Account created with ${firebaseUser.providerData[0].providerId}`,
            data: user,
          };
        }

        if (!user) {
          await admin.auth().deleteUser(firebaseUser.uid);
          throw new Error();
        }
      }

      throw new BadRequestError(
        'Email already used. Try login using Google/Apple provider or use another email'
      );
    }
  } catch (err) {
    if (err && !(err.code === 'auth/user-not-found')) throw err;
  }

  const strongPassword = await validator.isStrongPassword(password);
  if (!strongPassword) {
    throw new BadRequestError('Weak Password');
  }

  const userCreated = await createUser(email, password, name);

  return userCreated;
};

module.exports = { registerUser };
