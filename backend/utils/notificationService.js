const admin = require('firebase-admin');

exports.sendNotification = async (token, title, body) => {
    await admin.messaging().send({
        token,
        notification: { title, body }
    });
};
