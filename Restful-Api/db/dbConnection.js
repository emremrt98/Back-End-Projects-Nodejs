const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/restful_api', {
        useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true,
        useFindAndModify: false, useNewUrlParser: true
})
        .then(_ => console.log("Veri tabanına bağlanıldı"))
        .catch(_ => console.log("Veri tabanına bağlanılamadı"));



