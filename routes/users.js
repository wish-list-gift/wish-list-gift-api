const express = require('express');
const router = express.Router();
const app = express();
const User = require("../models/User");
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

let protectedRoute = (req, res, next) => {
    if (!req.headers.authorization)
        return res.status(403).send("Unauthenticated", "Line 9");
    let token = req.headers.authorization.split(" ")[1];

    if (!token) return res.status(403).send("Unauthenticated");
    try {
        var decoded = jwt.verify(token, "shhhhh");
    } catch (err) {
        return res.status(403).send("Unauthenticated");
    }

    if (!decoded) res.status(403).send("Unauthenticated");

    User.findById(decoded.id).then((user) => {
        if (!user) res.status(403).send("Unauthenticated");
        else {
            req.user = user
            next();
        }
    })
        .catch((err) => {
            console.log(err)
        })
}

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
    User.find({}, { _id: 1, email: 1, firstName: 1, lastName: 1 })
        .then((allUsers) => {
            res.json(allUsers);
        });
});



module.exports = app;





