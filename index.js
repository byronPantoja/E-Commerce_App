const express = require("express");

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

app.post("/", (req, res) => {
    req.on("data", data => {
        const parsed = data.toString("utf8").split("&");
        const formData = {};
        for (let pair of parsed) {
            const [key, value] = pair.split("=");
            formData[key] = value;
        }
        console.log(formData);
    });
    res.send("Account Created!");
});
app.listen(3000, () => {
    console.log("W3 AR3 B0RG");
});
