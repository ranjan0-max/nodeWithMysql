const removeNullKeys = (obj) => {
    return Object.fromEntries(Object.entries(obj).filter(([_, value]) => value !== null && value !== undefined));
};

module.exports = {
    removeNullKeys
};
