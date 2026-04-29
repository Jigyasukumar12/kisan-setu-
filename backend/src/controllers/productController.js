const Product = require('../models/Product');
const mongoose = require('mongoose');

// In-memory fallback if DB is not running
let mockProducts = [
  {
    _id: '1',
    farmerId: '123',
    title: 'ऑर्गेनिक आलू',
    category: 'Vegetables',
    price: 20,
    unit: 'kg',
    quantityAvailable: 100,
    images: ['https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&q=80&w=400'],
    createdAt: new Date(),
  },
  {
    _id: '2',
    farmerId: '124',
    title: 'ताजा प्याज',
    category: 'Vegetables',
    price: 30,
    unit: 'kg',
    quantityAvailable: 200,
    images: ['https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&q=80&w=400'],
    createdAt: new Date(),
  }
];

const isDbConnected = () => mongoose.connection.readyState === 1;

exports.getProducts = async (req, res, next) => {
  try {
    if (!isDbConnected()) {
      return res.status(200).json({ success: true, data: mockProducts, isMock: true });
    }
    const products = await Product.find().sort('-createdAt');
    res.status(200).json({ success: true, data: products, isMock: false });
  } catch (error) {
    next(error);
  }
};

exports.addProduct = async (req, res, next) => {
  try {
    const { title, category, price, quantityAvailable, description, images } = req.body;
    
    // Default image if none provided
    const imageArray = images && images.length > 0 ? images : ['https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=400'];

    if (!isDbConnected()) {
      const newProduct = {
        _id: Date.now().toString(),
        farmerId: '123', // mock
        title,
        category: category || 'Other',
        price,
        unit: 'kg',
        quantityAvailable,
        description,
        images: imageArray,
        createdAt: new Date(),
      };
      mockProducts.unshift(newProduct);
      return res.status(201).json({ success: true, data: newProduct, isMock: true });
    }

    const product = await Product.create({
      // We are hardcoding a farmerId for demo purposes since auth is not fully hooked up in frontend
      farmerId: new mongoose.Types.ObjectId('64f1a2b3c4d5e6f7a8b9c0d1'),
      title,
      category: category || 'Other',
      price,
      quantityAvailable,
      description,
      images: imageArray
    });

    res.status(201).json({ success: true, data: product, isMock: false });
  } catch (error) {
    next(error);
  }
};
