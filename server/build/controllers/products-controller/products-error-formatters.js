"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatProductValidationError = void 0;
const productValidationErrorMessagesLT = {
    name: 'Truksta produkto pavadinimo',
    price: 'Truksta produkto kainos',
    image: `Truksta produkto nuotraukos`,
};
const formatProductValidationError = (validationError) => {
    const errorArray = Object.entries(validationError.errors);
    for (let i = 0; i < errorArray.length; i++) {
        const [property] = errorArray[i];
        if (property in productValidationErrorMessagesLT) {
            return productValidationErrorMessagesLT[property];
        }
    }
    return 'Truksta duomenu';
};
exports.formatProductValidationError = formatProductValidationError;
