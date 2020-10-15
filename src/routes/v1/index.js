const productRoutes = require("../v1/products-routes")
const usersRoutes = require("../v1/users-routes")

module.exports = (app) => {
    app.use("/api/v1/users", usersRoutes);
    app.use("/api/v1/products", productRoutes);
}