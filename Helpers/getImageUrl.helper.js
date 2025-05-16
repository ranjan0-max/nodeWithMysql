const { getTempUrl } = require('./s3Aws.helper');
const Logger = require('../Helpers/logger');
const controllerName = 'getImageUrl.helper.js';

const getImageUrls = async (arrayOfImage) => {
    const images = [];
    for (const imageName of arrayOfImage) {
        try {
            const imageUrl = await getTempUrl(imageName);
            const imageData = {
                imageUrl,
                fileName: imageName
            };
            images.push(imageData);
        } catch (error) {
            Logger.error(error.message + 'at getImageUrls function while fetching the image from s3' + controllerName);
        }
    }
    return images;
};

module.exports = {
    getImageUrls
};
