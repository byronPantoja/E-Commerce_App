const express = require("express");
const bodyParser = require("body-parser");
const UsersRepo = require("./repositories/users.js");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send(`
  <div>
    <form method="POST">
      <input name="email" placeholder="email" />
      <input name="password" placeholder="password" />
      <input name="passwordConfirmation" placeholder="password confirmation" />
      <button>Sign Up</button>
    </form>
  </div>
    `);
});

app.post("/", async(req, res) => {
    const { email, password, passwordConfirmation } = req.body;

    const existingUser = await UsersRepo.getOneBy({ email });
    if (existingUser) {
        return res.send("Email is already in use");
    }

    if (password !== passwordConfirmation) {
        return res.send("Passwords must match...");
    }

    res.send("Account Created!");
});

app.listen(3000, () => {
    console.log("W3 AR3 B0RG");
});
