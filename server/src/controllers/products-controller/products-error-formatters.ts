import { Error } from 'mongoose';

type ErrorMessagesLT = {
    name: string,
    price: string,
    image: string,
};

const productValidationErrorMessagesLT: ErrorMessagesLT = {
    name: 'Truksta produkto pavadinimo',
    price: 'Truksta produkto kainos',
    image: 'Truksta produkto nuotraukos',
};

export const formatProductValidationError = (validationError: Error.ValidationError) => {
    const errorArray = Object.entries(validationError.errors);
    for (let i = 0; i < errorArray.length; i += 1) {
        const [property] = errorArray[i];
        if (property in productValidationErrorMessagesLT) {
            return productValidationErrorMessagesLT[property as keyof ErrorMessagesLT];
        }
    }
    return 'Truksta duomenu';
};
