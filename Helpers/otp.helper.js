const axios = require('axios');
const Logger = require('../Helpers/logger');
const controller = 'otp.helper.js';

const { MSG_91_AUTH_KEY, MSG_91_TEMPLATE_ID } = process.env;

const sendOTPMsg91 = async (phoneNumber) => {
    try {
        const options = {
            method: 'POST',
            url: 'https://control.msg91.com/api/v5/otp',
            headers: {
                'Content-Type': 'application/json',
                authkey: MSG_91_AUTH_KEY
            },
            data: {
                mobile: phoneNumber,
                template_id: MSG_91_TEMPLATE_ID,
                otp_expiry: '5'
            }
        };

        const { data } = await axios.request(options);

        if (data.type === 'success') {
            return {
                data: data,
                message: 'OTP sent successfully'
            };
        } else {
            return {
                data: data,
                message: 'Failed To Send OTP'
            };
        }
    } catch (error) {
        Logger.error(error.message + 'at sendOTPMsg91 function ' + controller);
        return error.message;
    }
};

const verifyOTPMsg91 = async (phoneNumber, otp) => {
    try {
        const options = {
            method: 'GET',
            url: 'https://control.msg91.com/api/v5/otp/verify',
            params: { otp: otp, mobile: phoneNumber },
            headers: { authkey: MSG_91_AUTH_KEY }
        };

        const { data } = await axios.request(options);

        if (data.type === 'success') {
            return {
                data: true,
                message: 'OTP verified successfully'
            };
        } else if (data?.type === 'error' && data?.code === '201') {
            return {
                data: false,
                message: 'Invalid authkey'
            };
        } else if (data.type === 'error') {
            const message = data.message === 'OTP not match' ? 'OTP not match' : 'OTP expired';
            return {
                data: false,
                message: message
            };
        }
    } catch (error) {
        Logger.error(error.message + 'at verifyOTPMsg91 function ' + controller);
        return error.message;
    }
};

module.exports = {
    verifyOTPMsg91,
    sendOTPMsg91
};
