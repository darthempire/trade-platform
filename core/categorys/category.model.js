const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
    categoryName: { type: String, unique: true, required: true },
    subCategorys: [{ type: Schema.ObjectId, ref: "Category" }],
    updateDate: { type: Date, default: Date.now },
    createdDate: { type: Date, default: Date.now },
    _creator: { type: Schema.ObjectId, ref: "User" }
});

schema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Category", schema);
