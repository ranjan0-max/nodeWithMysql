const getRemainingDays = async (startingDate, daysToAdd) => {
    const deliveryDate = new Date(startingDate);
    const nextDeliveryDate = new Date(deliveryDate);
    nextDeliveryDate.setDate(deliveryDate.getDate() + daysToAdd);

    const currentDate = new Date();
    const differenceInMilliseconds = nextDeliveryDate - currentDate;

    const millisecondsInDay = 1000 * 60 * 60 * 24;
    const differenceInDays = Math.ceil(differenceInMilliseconds / millisecondsInDay);
    return differenceInDays;
};

module.exports = {
    getRemainingDays
};
