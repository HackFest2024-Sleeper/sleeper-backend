const admin = require('../../../config/firebase-config');

const updateSmartLampStatus = async (req) => {
  const { uid } = req.body;
  const { status } = req.body;

  const ref = admin.database().ref(`/${uid}`);

  await ref.set(status);

  return 'Data updated successfully';
};

module.exports = { updateSmartLampStatus };
