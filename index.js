const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const UsersRepo = require('./repositories/users.js');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    cookieSession({
        keys: ['5VmOtXXG*bGIM3y/!{6OnbE6anBd#*|U;z{I`jx?Krh*b`gU&3>j9uAlqfB}y&'],
    })
);

app.get('/signup', (req, res) => {
    res.send(`
  <div>
    You've been assigned the designation of ${req.session.userId}
    <form method="POST">
      <input name="email" placeholder="email" />
      <input name="password" placeholder="password" />
      <input name="passwordConfirmation" placeholder="password confirmation" />
      <button>Sign Up</button>
    </form>
  </div>
    `);
});

app.post('/signup', async(req, res) => {
    const { email, password, passwordConfirmation } = req.body;

    const existingUser = await UsersRepo.getOneBy({ email });
    if (existingUser) {
        return res.send('Email is already in use');
    }

    if (password !== passwordConfirmation) {
        return res.send('Passwords must match...');
    }

    const user = await UsersRepo.create({ email, password });

    req.session.userId = user.id;

    res.send('Account Created!');
});

app.get('/signout', (req, res) => {
    req.session = null;
    res.send('You are logged out');
});

app.get('/signin', (req, res) => {
    res.send(`
<div>
  <form method="POST">
    <input name="email" placeholder="email" />
    <input name="password" placeholder="password" />
    <button>Sign In</button>
  </form>
</div>
  `);
});

app.post('/signin', async(req, res) => {
    const { email, password } = req.body;

    const user = await UsersRepo.getOneBy({ email });

    if (!user) {
        return res.send('Email not found');
    }

    if (user.password !== password) {
        return res.send('Invalid password');
    }

    req.session.userId = user.id;

    res.send('You are signed in!');
});

app.listen(3000, () => {
    console.log('W3 AR3 B0RG');
});