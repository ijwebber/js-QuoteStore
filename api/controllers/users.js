const userModel = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

function create(req, res, next) {
    userModel.countDocuments({ email: req.body.email }, function (err, count) {
        if (count > 0) {
            res.json({ status: "error", message: "Email already taken", data: null });
        } else {
            userModel.create({ name: req.body.name, email: req.body.email, password: req.body.password }, function (err, result) {
                if (err)
                    res.json({ status: "error", message: err.message, data: null });
                else
                    res.json({ status: "success", message: "User added successfully!", data: null });

            });
        }
    });


}

function authenticate(req, res, next) {

    userModel.countDocuments({ email: req.body.email }, function (err, count) {
        if (count > 0) {
            userModel.findOne({ email: req.body.email }, function (err, userInfo) {
                if (err) {
                    next(err);
                } else {
                    if (bcrypt.compareSync(req.body.password, userInfo.password)) {
                        const token = jwt.sign({ id: userInfo._id }, req.app.get('secretKey'), { expiresIn: '3h' });
                        res.cookie("token", token, { httpOnly: true }).send({ status: "success" });
                    } else {
                        res.status(401).json({ status: "error", message: "Invalid email/password!", data: null });
                    }
                }
            });
        } else {
            res.status(401).json({ status: "error", message: "Invalid email/password!", data: null });
        }
    });


}

function logout(req, res, next) {
    res.clearCookie("token");
    res.send({ success: true });
}

module.exports = { create, authenticate, logout };