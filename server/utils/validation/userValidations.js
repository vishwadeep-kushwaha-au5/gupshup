const Joi = require('@hapi/joi');
const {email, password, name, photoUrl, about} = require('./allValidation');

exports.registerSchema = Joi.object({email: email.required(), name: name.required(), password: password.required()});

exports.loginSchema = Joi.object({email: email.required(), password: password.required()});

exports.userSchema = Joi.object({name: name, profilePhoto: photoUrl, from: Joi.string(), dob: Joi.date(), about: about})