const validator = require('validator');
const { BadRequestError } = require('../../errors');

const createUser = async (email, password, fullName) => {
  let firebaseUser, sequelizeUser;
  try {
    firebaseUser = await admin.auth().createUser({
      email: email,
      password: password,
      displayName: fullName,
    });
    const result = await sequelize.transaction(async (t) => {
      sequelizeUser = await User.create(
        {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          fullName: firebaseUser.displayName,
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
  const { fullName, email, password } = req.body;
  let firebaseUser;

  if (!fullName || !email || !password) {
    throw new BadRequestError('fullName, email, and password is required');
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
            fullName: firebaseUser.displayName,
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

  const userCreated = await createUser(email, password, fullName);

  return userCreated;
};

module.exports = { registerUser };
