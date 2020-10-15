const bcrypt = require('bcryptjs');
const Products = require("../../mongo/models/products")


const createProduct = async(req, res) => {
    try {
        const titulo = req.body.titulo;
        const descripcion = req.body.descripcion;
        const precio = req.body.precio;
        const images = req.body.images;
        const userId = req.body.userId

        const product = await Products.create({
            titulo,
            descripcion,
            precio,
            images,
            user: userId
        })
        res.send({ status: "Ok", data: product })
    } catch (e) {
        console.log("Error al crear el producto", e)
        res.status(500).send({
            status: "Error",
            data: e.message
        })
    }
}
const deleteProduct = (req, res) => {

}
const getProduct = async(req, res) => {
    try {
        const products = await Products.find().populate("user", "username email").select("titulo descripcion");
        res.send({ status: "Ok", data: products })
    } catch (e) {
        console.log("Error producto eliminado", e);
        res.status(500).send({ status: "Error", data: e.message })
    }

}

const getProductByUser = async(req, res) => {
    try {
        req.params.userId
        const products = await Products.find({
            user: req.params.userId
        });
        res.send({ status: "Ok", data: products })
    } catch (e) {
        console.log("Error producto eliminado", e);
        res.status(500).send({ status: "Error", data: e.message })
    }

}



module.exports = { createProduct, deleteProduct, getProduct, getProductByUser }