const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.get("/", (req, res) => {
    res.send(`
  <div>
    <form method="POST">
      <input name="email" placeholder="email" />
      <input name="password" placeholder="password" />
      <input name="passwordConfirmation" placeholder="password confirmation" />
      <button>Sign In</button>
    </form>
  </div>
    `);
});

app.post("/", bodyParser.urlencoded({ extended: true }), (req, res) => {
    console.log(req.body);
    res.send("Account Created!");
});
app.listen(3000, () => {
    console.log("W3 AR3 B0RG");
});
