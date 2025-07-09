const checkMandatoryFields = (obj, requiredFields) => {
    const missingFields = [];
    requiredFields.forEach(field => {
        if (!(field in obj) || obj[field] === undefined || obj[field] === null || obj[field] === '') {
        missingFields.push(field);
        }
    });
    return missingFields;
}

module.exports = {
    checkMandatoryFields
}