const Product = require('../models/Product');

// Tüm ürünleri getir
const getProducts = async (req, res) => {
  const products = await Product.find({});
  res.json(products);
};

// Tek bir ürünü ID ile getir
const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Ürün bulunamadı' });
  }
};

// Yeni ürün oluştur
const createProduct = async (req, res) => {
  const { name, price, description, imageUrl, category, countInStock } = req.body;
  const product = new Product({
    name, price, description, imageUrl, category, countInStock,
  });
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
};

// Ürün güncelle
const updateProduct = async (req, res) => {
  const { name, price, description, imageUrl, category, countInStock } = req.body;
  const product = await Product.findById(req.params.id);
  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.imageUrl = imageUrl;
    product.category = category;
    product.countInStock = countInStock;
    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404).json({ message: 'Ürün bulunamadı' });
  }
};

// Ürün sil
const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.remove();
    res.json({ message: 'Ürün silindi' });
  } else {
    res.status(404).json({ message: 'Ürün bulunamadı' });
  }
};

module.exports = { getProducts, getProductById, createProduct, updateProduct, deleteProduct };
