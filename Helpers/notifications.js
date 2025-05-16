const admin = require('firebase-admin');
const Logger = require('../Helpers/logger');

// Initialize Firebase Admin SDK with your service account credentials
const serviceAccount = require('../medisupply-b1933-firebase-adminsdk-8qhku-341ab8237b.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

// Function to send FCM notification
const sendFCMNotification = async (userToken, title, body, data = null) => {
    const message = {
        notification: {
            title,
            body
        },
        data: data,
        token: userToken
    };

    try {
        const response = await admin.messaging().send(message);
        return response;
    } catch (error) {
        Logger.error(error.message + 'at sendFCMNotification function ' + 'Notification.js');
        return error;
    }
};

module.exports = { sendFCMNotification };
