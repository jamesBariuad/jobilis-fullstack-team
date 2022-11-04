const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const passwordComplexity = require('joi-password-complexity');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    contact: {type: String, required: true},
    recruits: [{type: String}],
    bookings: [{type: String}],
    services: {
        laundress: {
            active:{type:Boolean},
            description:{type: String},
            location:{type: String},
            labor:{type:Number},
            rating:{type:Number}
        },
        babysitter: {
            active:{type:Boolean},
            description:{type: String},
            location:{type: String},
            labor:{type:Number},
            rating:{type:Number}
        },
        cleaner: {
            active:{type:Boolean},
            description:{type: String},
            location:{type: String},
            labor:{type:Number},
            rating:{type:Number}
        }
    }
});

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id:this._id}, process.env.JWTPRIVATEKEY)
    return token
};



const validate = (data) => {
    const schema = Joi.object({
        firstName: Joi.string().required().label('First Name'),
        lastName: Joi.string().required().label('Last Name'),
        email: Joi.string().email().required().label('Email'),
        password: passwordComplexity().required().label("Password"),
        contact: Joi.string().required().label('Contact'),
        recruits: Joi.array().required().label('Recruits'),
        bookings: Joi.array().required().label('Bookings'),
        services: Joi.object({
            laundress: Joi.object({
                active:Joi.boolean(),
                description:Joi.string(),
                location:Joi.string(),
                labor:Joi.number(),
                rating:Joi.number()
            }),
            babysitter: Joi.object({
                active:Joi.boolean(),
                description:Joi.string(),
                location:Joi.string(),
                labor:Joi.number(),
                rating:Joi.number()
            }),
            cleaner: Joi.object({
                active:Joi.boolean(),
                description:Joi.string(),
                location:Joi.string(),
                labor:Joi.number(),
                rating:Joi.number()
            })
        })
    });
    return schema.validate(data)
};
const User = mongoose.model("User",userSchema);
module.exports = {User, validate};