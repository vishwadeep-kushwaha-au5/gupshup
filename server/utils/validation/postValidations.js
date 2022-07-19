const Joi = require('@hapi/joi');
const {email, password, name, objectId, photoUrl, string, about} = require('./allValidation');

exports.postSchema = Joi.object({
    authorId: objectId.required(),
    photo: photoUrl.allow(""),
    desc: about.required()});