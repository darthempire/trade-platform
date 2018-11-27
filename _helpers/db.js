const config = require("config.json");
const mongoose = require("mongoose");
mongoose.connect(config.connectionString, { useNewUrlParser: true });
mongoose.Promise = global.Promise;

module.exports = {
    User: require("../core/users/user.model"),
    Company: require("../core/companies/company.model"),
    Category: require("../core/categorys/category.model"),
};
