const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
    companyName: { type: String, unique: true, required: true },
    country: { type: String, required: true },
    region: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    directorFirstName: { type: String, required: true },
    directorLastName: { type: String, required: true },
    legalFormOfOrganization: { type: String, required: true },
    updateDate: { type: Date, default: Date.now },
    createdDate: { type: Date, default: Date.now },
    tags: [{ type: String }],
    _creator: { type: Schema.ObjectId, ref: "User" },
    _admins: [{ type: Schema.ObjectId, ref: "User" }]
});

schema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Company", schema);
