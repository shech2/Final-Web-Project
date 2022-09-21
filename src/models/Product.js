const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
    {
    Product_name: {
        type: String,
         required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required:true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
         ref: 'Category', 
         required: true},
    stock: {
        type: Number,
        required:true
    },
    image: {
        type: String,
        required:true
    },
    rating: {
        type: Number,
        required:true
    },
},
    { timestamps: true}
);

module.exports = mongoose.model("Product", productSchema);


