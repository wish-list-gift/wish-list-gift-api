const express = require('express');
const router = express.Router();
const app = express();
const User = require("../models/User");
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


// /auth/signup
app.post("/register", async (req, res) => {

    const emailExists = await User.findOne({ email: req.body.email })
    if (emailExists) {

        return res.status(400).send({ message: "User already exists" })
    }
    bcrypt.hash(req.body.password, 10, function (err, hash) {
        // Store hash in your password DB.
        if (err) console.log("HASING ERROR", err);
        else {
            User.create({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: hash,
            })
                .then((user) => {
                    res.status(200).send("User Created");
                })
                .catch((err) => {
                    res.status(500).send("Oooooeps");
                });
        }
    });
});
// /auth/login
app.post("/login", (req, res) => {
    User.findOne({ email: req.body.email })
        .then((user) => {
            if (!user) res.status(403).send("Invalid credentials");
            else if (user) {
                bcrypt.compare(req.body.password, user.password, function (err, match) {
                    // result == true
                    if (err) res.status(500).send("Oooooeps");
                    if (match) {
                        var token = jwt.sign({ id: user._id }, "shhhhh");
                        res.json({ token: token });
                    } else res.status(403).send("Invalid credentials");
                });
            } else {
                res.status(403).send("Invalid credentials");
            }
        });
});

app.get("/getAllUsers", (req, res) => {
    User.find({}, { _id: 1, email: 1, firstName: 1, lastName: 1 }).then((allUsers) => {
        res.json(allUsers);
    });
});

module.exports = app;





