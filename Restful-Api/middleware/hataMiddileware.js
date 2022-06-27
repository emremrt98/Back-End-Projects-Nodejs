const { json } = require("express");


const hataYakalayici = (err, req, res, next) => {
    if (err.code === 11000) {
        return res.json({
            mesaj: Object.keys(err.keyValue) + " için girdiğiniz değer " + Object.values(err.keyValue) +
                " veritabanında kayıtlı bulunduğu için tekrar eklenemez/güncellenemez ve unique olmalı",
            hataKodu: 400
        })
    }
    if (err.code === 66) {
        return res.json({
            mesaj: "Değiştirilemez bir alanı değiştirmeye kalktın",
            hataKodu: 400
        })
    }

    res.status(err.statusCode || 500).json({
        hataKodu: err.statusCode || 400,
        mesaj: err.message
    })

}

module.exports = hataYakalayici;