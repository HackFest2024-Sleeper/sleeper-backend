const admin = require('../../../config/firebase-config');

const updateSmartLampStatus = async (req) => {
  // const { uid } = req.user;
  const uid = 'S5Kkhk64eEY4zgWRoKiB2uZsMw72';
  const { status } = req.body;

  const ref = admin.database().ref(`/${uid}`);

  await ref.set(status);

  return 'Data updated successfully';
};

module.exports = { updateSmartLampStatus };