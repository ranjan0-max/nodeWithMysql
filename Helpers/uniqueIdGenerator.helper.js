const generateUniqueId = (prefix = 'UID') => {
    const timestamp = Date.now();
    const random = Math.floor(1000 + Math.random() * 9000);
    return `${prefix}_${timestamp}_${random}`;
};

module.exports = {
    generateUniqueId
};
