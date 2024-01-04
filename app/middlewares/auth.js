const { UnauthorizedError } = require("../errors");

const authenticateUser = async (req, res, next) => {
  try {
    let token;
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer')) {
      token = authHeader.split(' ')[1];
    }
    if (!token) {
      throw new UnauthorizedError('Authorization Invalid');
    }

    const payload = await admin.auth().verifyIdToken(token);

    req.user = payload;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = { authenticateUser };
