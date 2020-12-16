const mongoose = require('mongoose');
const Product = require('../models/Product')

const products = [
    {
        productName: 'Miss Lola Guilty Pleasure boots',
        link: 'https://www.misslola.com/products/guilty-pleasure-white',
        price: 25,
        image: 'https://cdn.shopify.com/s/files/1/2723/4846/products/miss_lola_NE091420_03_1024x1024@2x.jpg?v=1607389564',
        notes: 'size 5.5',
        author: "5fd3e19ddd0be9bd439e0d37"

    },

    {
        productName: 'Other boots',
        link: 'https://www.misslola.com/products/guilty-pleasure-white',
        price: 30,
        image: 'https://cdn.shopify.com/s/files/1/2723/4846/products/miss_lola_NE091420_03_1024x1024@2x.jpg?v=1607389564',
        notes: 'size 6',
        author: "5fd3e19ddd0be9bd439e0d37"

    },

    {
        productName: 'Other other boots',
        link: 'https://www.misslola.com/products/guilty-pleasure-white',
        price: 35,
        image: 'https://cdn.shopify.com/s/files/1/2723/4846/products/miss_lola_NE091420_03_1024x1024@2x.jpg?v=1607389564',
        notes: 'size 6.5',
        author: "5fd3e19ddd0be9bd439e0d37"

    },
];

mongoose.connect('mongodb://localhost:27017/wishlist-site')
    .then(() => {
        Product.create(products)
        console.log('Connected to MongoDB!');
    })
    .catch(err => {
        console.log(err);
    })