require("dotenv").config();
const Product = require("../models/product");
const jwt = require("jsonwebtoken");

exports.productRegister = async (req, res, next) => {
  const token = req.header("auth-token");
  const id_seller = jwt.verify(token, process.env.SELLER_TOKEN)._id;
  // console.log(req.files[0]);
  var pictures = [];
  for (let i = 0; i < req.files.length; i++) {
    pictures.push(req.files[i].filename);
  }
  // console.log(pictures)
  const newProduct = new Product({
    name: req.body.name,
    description: req.body.description,
    id_category: req.body.id_category,
    id_seller: id_seller,
    price: req.body.price,
    picture: pictures,
  });
  try {
    const product = await newProduct.save();
    res.status(201).send(product);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};
exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(200).send(products);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
};

exports.productUpdated = async (req, res, next) => {
  const token = req.header("auth-token");
  const id_seller = jwt.verify(token, process.env.SELLER_TOKEN)._id;
  var pictures = [];
  for (let i = 0; i < req.files.length; i++) {
    pictures.push(req.files[i].filename);
  }
  const product = await Products.findById({ _id: req.params.id });

  if (!product) {
    res.status(404).send({ message: "Product not found" });
  }

  product.name = req.body.name;
  product.price = req.body.price;
  // product.description = req.body.description;
  product.picture = pictures;
  // product.id_seller = id_seller;
  // product.id_category = req.body.id_category;

  try {
    const newProduct = await product.save();
    res.status(201).send(newProduct);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};
exports.productDeleted = async (req, res, next) => {
  try {
    const product = await Product.deleteOne({ _id: req.body.id });
    res.status(201).send(product);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};
exports.getOneProduct = async (req, res, next) => {
  try {
    const product = await Product.findOne({ _id: req.params.id });
    res.status(201).send(product);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};
