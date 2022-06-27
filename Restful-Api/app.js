const express = require('express');
require('./db/dbConnection');
const hataMiddleware = require('./middleware/hataMiddileware');
const jwt = require('jsonwebtoken');

// Routes
const userRouter = require("./router/userRouter");
const { func } = require('@hapi/joi');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', userRouter);





app.get('/', (req, res) => {
    res.status(200).json({ 'mesaj': 'hoşgeldiniz' });
});


app.use(hataMiddleware);

function test(){
    const token = jwt.sign({_userID: 'yenikullanicininidsi', isAdmin : true, active:true}, '123456', {expiresIn: '2h'});
    console.log(token);
    const result = jwt.verify(token, '123456');
    console.log(result);
}

test();



app.listen(3000, _ => {
    console.log('3000 Portu Dinleniyor.');
})