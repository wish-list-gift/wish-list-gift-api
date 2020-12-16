const express = require('express');
const router = express.Router();
const Product = require('../models/Product')
const jwt = require("jsonwebtoken");
const User = require('../models/User')

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


/* GET home page */
router.get("/profile", protectedRoute, (req, res) => {
    Product.find({ author: req.user._id })
        .then((products) => {
            res.json(products)
        })
        .catch(err => {
            console.log(err)
        })
});

router.get("/friends", protectedRoute, (req, res) => {
    User.findById(req.user.id)
        .populate("friends")
        .then((friend) => {
            res.json(friend)
        })
        .catch(err =>
            console.log(err)
        )
});



module.exports = router