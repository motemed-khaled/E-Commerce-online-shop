const ProductModel = require("../models/Product");

exports.getAllProducts = async (req, res) => {
  let {limit, page, color, price} = req.query;
  limit = limit ? +limit : 9;
  page = page ? +page : 1;
  skip = (page-1)*limit;

  const filterOptions = {}
  if(color) filterOptions.color = color.split(',')
  // {$or: [{price:{$lte:100,$gte:0}}]}
  if(price) filterOptions.$or = price.split(',').map(el=>{return{price: {$lte:+el,$gte:+el-100}}})
  try {
    const productsCount = await ProductModel.find(filterOptions).count();
    const products = await ProductModel.find(filterOptions).limit(limit).skip(skip);
    res.json({ count:productsCount , data: products, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getProductsByCategoryId = async (req, res) => {
  try {
    const products = await ProductModel.find({
      category_id: req.params.id,
    });
    res.json({ data: products, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const product = await ProductModel.create(req.body);
    res.json({ data: product, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id);
    res.json({ data: product, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await await ProductModel.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    res.json({ data: product, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await ProductModel.findByIdAndDelete(req.params.id);
    res.json({ data: product, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getFeaturedProducts = async (req, res) => {
  try {
    const products = await ProductModel.find({ is_featured: true });
    res.json({ data: products, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getRecentProducts = async (req, res) => {
  try {
    const products = await ProductModel.find({ is_recent: true });
    res.json({ data: products, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
