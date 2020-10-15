const mongoose = require("mongoose");

const { Schema } = mongoose;

const productSchema = new Schema({
        titulo: { type: String, required: true },
        descripcion: { type: String, required: true },
        precio: { type: Number, required: true },
        images: { type: [{ type: String, required: true }], default: [] },
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
    }, {
        timestamps: true
    }

);

const model = mongoose.model("Product", productSchema);

module.exports = model;