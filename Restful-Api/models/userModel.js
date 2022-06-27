const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require('@hapi/joi');
const { func } = require("@hapi/joi");
const createError = require("http-errors");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserSchema = new Schema({
    isim: {
        type: String,
        required: true,
        trim: true,
        minLength: 3, 
        maxLength: 16
    },
    userName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 5,
        maxLength: 16
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    sifre: {
        type: String,
        required: true,
        trim: true,
    },
    isAdmin: {
        type : Boolean,
        default : false
    }
}, { collection: 'kullanicilar', timestamps: true });


const schema = Joi.object({
    isim: Joi.string().min(3).max(20).trim(),
    userName: Joi.string().min(3).max(20).trim(),
    email: Joi.string().trim().email(),
    sifre: Joi.string().trim()
})

// Yeni bir user için kullandık
UserSchema.methods.joiValidation = function (userObject) {
    schema.required();
    return schema.validate(userObject);
}

UserSchema.methods.toJson = function () {
    const user = this.toObject();
    const { isim, email, userName } = user;

    return { isim, email, userName };
}

UserSchema.statics.girisYap = async (email, sifre) => {

    const { error, value } = schema.validate({ email, sifre });

    if (error) {
        throw createError(400, error);
    } else {
        const user = await User.findOne({ email });

        if (!user) {
            throw createError(400, "Girilen email/sifre hatalı");
        }

        const sifreKontrol = await bcrypt.compare(sifre, user.sifre);
        if (!sifreKontrol) {
            throw createError(400, "Girilen email/sifre hatalı");
        }

        return user;
    }


}

UserSchema.methods.generateToken = async function () {
    const girisYapanUser = this;
    const token = await jwt.sign({ _id: girisYapanUser._id }, 'secretKey', { expiresIn: '1h' });
    return token;
}

//Patch işlemi için
UserSchema.statics.joiValidationForUpdate = function (userObject) {

    return schema.validate(userObject);
}



const User = mongoose.model('User', UserSchema);




module.exports = User;