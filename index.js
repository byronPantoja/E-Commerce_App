const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const authRouter = require('./routes/admin/auth');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    cookieSession({
        keys: ['5VmOtXXG*bGIM3y/!{6OnbE6anBd#*|U;z{I`jx?Krh*b`gU&3>j9uAlqfB}y&'],
    })
);
app.use(authRouter);

app.listen(3000, () => {
    console.log('W3 AR3 B0RG');
});