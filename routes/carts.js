const express = require('express');
const cartsRepo = require('../repositories/carts');
const productsRepo = require('../repositories/products');
const cartShowTemplate = require('../views/carts/show');

const router = express.Router();

//post add to cart
router.post('/cart/products', async(req, res) => {
    // Is there a cart?
    let cart;
    if (!req.session.cartId) {
        // no cart? Then create one
        //store cartId data on the req.session.cartId property
        cart = await cartsRepo.create({ items: [] });
        req.session.cartId = cart.id;
    } else {
        // There is cart, let's get it from the repo
        cart = await cartsRepo.getOne(req.session.cartId);
    }
    const existingItem = cart.items.find(item => item.id === req.body.productId);
    if (existingItem) {
        //add qty to cart
        existingItem.quantity++;
    } else {
        // add new product id to the items array
        cart.items.push({ id: req.body.productId, quantity: 1 });
    }
    await cartsRepo.update(cart.id, {
        items: cart.items,
    });

    res.redirect('/cart');
});

//get show cart
router.get('/cart', async(req, res) => {
    if (!req.session.cartId) {
        return res.redirect('/');
    }

    const cart = await cartsRepo.getOne(req.session.cartId);

    for (let item of cart.items) {
        const product = await productsRepo.getOne(item.id);

        item.product = product;
    }

    res.send(cartShowTemplate({ items: cart.items }));
});

//get delete from cart
router.post('/cart/products/delete', async(req, res) => {
    const { itemId } = req.body;
    const cart = await cartsRepo.getOne(req.session.cartId);

    const items = cart.items.filter(item => item.id !== itemId);

    await cartsRepo.update(req.session.cartId, { items });

    res.redirect('/cart');
});
module.exports = router;