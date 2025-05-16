const axios = require('axios');
const Logger = require('../Helpers/logger');
require('dotenv').config();

const GUPSHUP_API_URL = 'https://api.gupshup.io/wa/api/v1/msg';
const GUPSHUP_OPTIN_URL = 'https://api.gupshup.io/sm/api/v1/app/opt/in/Sanjeevni';
const GUPSHUP_TEMPLATE_URL = 'https://api.gupshup.io/wa/api/v1/template/msg';
const GUPSHUP_API_KEY = process.env.GUPSHUP_API_KEY;

async function optInUser(phoneNumber) {
    try {
        const response = await axios.post(GUPSHUP_OPTIN_URL, null, {
            params: {
                user: phoneNumber,
                appname: process.env.GUPSHUP_SRC_NAME
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                apikey: GUPSHUP_API_KEY
            }
        });
        return response.data;
    } catch (error) {
        Logger.error(error.response ? error.response.data : error.message + 'at optInUser function in whatsapp helper');
        return error.message;
    }
}

async function sendWhatsAppMessage(phoneNumber, message) {
    try {
        const response = await axios.post(GUPSHUP_API_URL, null, {
            params: {
                channel: 'whatsapp',
                source: process.env.GUPSHUP_SOURCE_NUMBER,
                destination: phoneNumber,
                message,
                'src.name': process.env.GUPSHUP_SRC_NAME
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                apikey: GUPSHUP_API_KEY
            }
        });

        return response.data;
    } catch (error) {
        Logger.error(error.response ? error.response.data : error.message + 'at sendWhatsAppMessage function in whatsapp helper');
        throw error;
    }
}

const sendTemplateMessage = async (recipient, templateId, params = ['Aayush']) => {
    try {
        let data = new URLSearchParams({
            source: process.env.GUPSHUP_SOURCE_NUMBER,
            destination: recipient,
            template: `{"id":"${templateId}","params": ${JSON.stringify(params)}}`
        }).toString();

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: GUPSHUP_TEMPLATE_URL,
            headers: {
                apikey: GUPSHUP_API_KEY,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: data
        };

        const response = await axios.request(config);
        return response.data;
    } catch (error) {
        Logger.error(error.message + 'at sendTemplateMessage function in whatsapp helper');
        throw error;
    }
};

module.exports = { optInUser, sendWhatsAppMessage, sendTemplateMessage };
