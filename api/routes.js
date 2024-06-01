'use strict';
function routes(app) {
    let userRoutes = require("./routes/userRoutes");
    app.use("/user", userRoutes);
}
module.exports = routes;