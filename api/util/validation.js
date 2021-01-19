var jwt = require('jsonwebtoken');

// Check if a valid logged in user
function validateUser(req, res, next) {
    jwt.verify(req.cookies.token, req.app.get('secretKey'), function (err, decoded) {
        if (err) {
            res.json({ status: "error", message: "Not Authorised", data: null });
        } else {
            req.body.userId = decoded.id;
            req.body.admin = decoded.admin;
            next();
        }
    });

}

// Check if an admin
function validateAdmin(req, res, next) {
    const admin = req.body.admin;

    if (admin) {
        next();
    } else {
        res.json({ status: "error", message: "Not Authorised", data: null });
    }

}

module.exports = { validateUser, validateAdmin }