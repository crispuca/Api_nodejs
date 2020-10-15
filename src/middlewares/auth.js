const jwt = require("jsonwebtoken");



const isValidHostname = (req, res, next) => {
    if (req.hostname == "localhost") {
        next();
    } else {
        res.status(403).send({ status: "Acceso denegado" })
    }
    console.log("req.hostname", req.hostname);

};




const isAuth = (req, res, next) => {
    try {
        console.log("req.headers", req.headers);
        const { token } = req.headers;
        if (token) {
            const data = jwt.verify(token, process.env.JWT_SECRET)
            console.log("jwt data", data);
            if (data.userId != req.body.userId && data.role != "admin") {
                throw { code: 403, status: "Acceso denegado", message: "missing permission invalid or invalide role" };
            }
            req.sessionData = { userId: data.userId, role: data.role }
            next();
        } else {
            throw { code: 403, status: "Acceso denegado", message: "missing header token" };
            // res.status(403).send({ status: "Acceso denegado", message: "missing header token" })
        }
    } catch (e) {

        res.status(e.code || 500).send({ status: e.status || "ERROR", message: e.message })
    }
    // if (req.hostname == "localhost") {
    //     next();
    // } else {
    //     res.status(403).send({ status: "Acceso denegado" })
    // }
    // console.log("req.hostname", req.hostname);


};



const isAdmin = (req, res, next) => {
    try {
        const { role } = req.sessionData;
        console.log("isAdmin", role);
        if (role != "admin") {
            throw { code: 403, status: "Acceso denegado", message: "Invalide role" };

        } else {
            next();
        }

    } catch (e) {
        res.status(e.code || 500).send({ status: e.status || "ERROR", message: e.message })
    }


};

module.exports = (isValidHostname, isAuth, isAdmin);