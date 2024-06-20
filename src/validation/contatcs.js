import Joi from 'joi';

export const createContactSchema = Joi.object({
    name: Joi.string().min(3).max(20).required(),
    phoneNumber: Joi.string().pattern(/^[0-9]+$/).min(3).max(20).required(),
    email: Joi.string().email().min(3).max(20).required(),
    isFavourite: Joi.boolean(),
    contactType:Joi.string().valid('work', 'home', 'personal').min(3).max(20).required(),

})
