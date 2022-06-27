const User = require('../models/userModel');
const createError = require("http-errors");
const bcrypt = require('bcrypt');


const allUserList = async (req, res) => {
    const allUser = await User.find({});
    res.json(allUser)
}

const userInformation = (req, res, next) => {
    res.json(req.user);
}

const userInfoUpdate = async (req, res, next) => {
    delete req.body.createdAt;
    delete req.body.updatedAt;

    if (req.body.hasOwnProperty('sifre')) {
        req.body.sifre = await bcrypt.hash(req.body.sifre, 10);
    }

    const { error, sonuc } = User.joiValidationForUpdate(req.body);
    if (error) {
        next(createError(400, error));
    } else {
        try {
            const guncellenenKullanici = await User.findByIdAndUpdate
                ({ _id: req.user._id }, req.body, { new: true, runValidators: true });

            if (guncellenenKullanici) {
                return res.json(guncellenenKullanici);
            }
            else {
                return res.status(404).json({
                    mesaj: "Kullanıcı bulunamadı"
                })
            };
        } catch (err) {
            next(err);
        }
    }
}

const createNewUser = async (req, res, next) => {
    try {
        const eklenecekUser = new User(req.body);
        eklenecekUser.sifre = await bcrypt.hash(eklenecekUser.sifre, 10);
        const { error, sonuc } = eklenecekUser.joiValidation(req.body);

        if (error) {
            next(createError(400, error));
        } else {
            const sonuc = await eklenecekUser.save();
            res.send(sonuc);
        }

    } catch (err) {
        next(err);
    }

}

const login = async (req, res, next) => {
    try {
        const user = await User.girisYap(req.body.email, req.body.sifre);
        const token = await user.generateToken();
        res.json({
            user,
            token
        });


    } catch (error) {
        next(error);
    }
}

const adminUserUpdate = async (req, res, next) => {

    delete req.body.createdAt;
    delete req.body.updatedAt;

    if (req.body.hasOwnProperty('sifre')) {
        req.body.sifre = await bcrypt.hash(req.body.sifre, 10);
    }

    const { error, sonuc } = User.joiValidationForUpdate(req.body);
    if (error) {
        next(createError(400, error));
    } else {
        try {
            const guncellenenKullanici = await User.findByIdAndUpdate
                ({ _id: req.params.id }, req.body, { new: true, runValidators: true });

            if (guncellenenKullanici) {
                return res.json(guncellenenKullanici);
            }
            else {
                return res.status(404).json({
                    mesaj: "Kullanıcı bulunamadı"
                })
            };
        } catch (err) {
            next(err);
        }
    }

}

const deleteAllUser = async (req, res, next) => {
    try {
        const silinenUser = await User.deleteMany({ isAdmin: false });
        if (silinenUser) {
            return res.json({
                mesaj: "Tüm Kullanıcı Silindi"
            });
        }
        else {

            throw createError(404, "Kullanıcı Bulunamadı");
        }

    } catch (err) {
        next(createError(400, err));
    }
}

const deleteUser = async (req, res, next) => {
    try {
        const silinenUser = await User.findByIdAndDelete({ _id: req.user._id });
        if (silinenUser) {
            return res.json({
                mesaj: "Kullanıcı Silindi"
            });
        }
        else {

            throw createError(404, "Kullanıcı Bulunamadı");
        }

    } catch (err) {
        next(createError(400, err));
    }
}

const adminUserDelete = async (req, res, next) => {
    try {
        const silinenUser = await User.findByIdAndDelete({ _id: req.params.id });
        if (silinenUser) {
            return res.json({
                mesaj: "Kullanıcı Silindi"
            });
        }
        else {

            throw createError(404, "Kullanıcı Bulunamadı");
        }

    } catch (err) {
        next(createError(400, err));
    }
}

module.exports = {
    allUserList,
    userInformation,
    userInfoUpdate,
    createNewUser,
    login,
    adminUserUpdate,
    deleteAllUser,
    deleteUser,
    adminUserDelete
}