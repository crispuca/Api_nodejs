const bcrypt = require('bcryptjs');
const Users = require('../../mongo/models/users');
const jwt = require("jsonwebtoken");
const Products = require("../../mongo/models/products")


const expiresIn = 60 * 10;

const login = async(req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Users.findOne({ email });
        if (user) {

            const isOk = await bcrypt.compare(password, user.password);
            if (isOk) {
                const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn })
                res.send({ status: "Ok", data: { token, expiresIn } });
            } else {
                res.status(403).send({ status: "contraseña invalida", message: "usuario logueado" });
            }


        } else {
            res.status(401).send({ status: "Usuario no encontrado", message: "" });
        }
    } catch (e) {
        res.status(500).send({ status: "Error", message: e.message })
    }
}

const createUser = async(req, res) => {
    try {


        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;
        const data = req.body.data;

        const hash = await bcrypt.hash(password, 15);

        await Users.create({
            username: username,
            email: email,
            data: data,
            password: hash
        })

        // const user = new user();
        // user.username = username;
        // user.email = email;
        // user.password = hash;
        // user.data = data;

        // await user.save()

        res.send({ status: "ok", message: "user created" })


    } catch (error) {
        // if (error.code & error.code === 11000) {
        //     res.status(400).send({ status: "Duplicated", message: error.keyValue });
        //     return;
        // }
        // console.log("error al crear el usuario", error)
        res.status(500).send({ status: "Error", message: error.message })
    }
}



const deleteUser = async(req, res) => {
    try {
        const { userId } = req.body;

        if (!userId) {
            throw new Error("parametro perdido de userId")
        }

        await Users.findByIdAndDelete(userId);
        await Products.deleteMany({ user: userId })

        res.send({ status: "ok", message: "user deleted" })
    } catch (e) {
        res.status(500).send({ status: "Error", message: e.message })
    }
}
const getUser = async(req, res) => {
    try {
        const users = await Users.find().select({ password: 0, role: 0 });
        res.send({ status: "ok", data: [] })
    } catch (e) {
        res.status(500).send({ status: "Error", message: e.message })
    }


}


const updateUser = async(req, res) => {
    try {
        console.log("req.sessionData", req.sessionData.userId);
        const { username, email, data, userId } = req.body;
        await Users.findByIdAndUpdate(userId, {
            username,
            data,
            email
        })
        res.send({ status: "ok", message: "user update" })
    } catch (error) {

        if (error.code & error.code === 11000) {
            res.status(400).send({ status: "Datos Duplicados", message: error.keyValue });
            return;
        }
        res.status(500).send({ status: "Error", message: error.message })
    }
}
module.exports = { createUser, deleteUser, getUser, updateUser, login };