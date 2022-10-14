const Cart = require('../models/cart');

exports.addItemToCart =  (req, res) => {

    Cart.findOne({ user: req.session.user.id })
        .exec((error, cart) => {
            if(error) return console.log(error);
            if(cart) {
                // if cart already exists then update cart by quantity

                const product = req.body.cartItems.product;
                const item = cart.cartItems.find(c => c.product == product)

                if(item) {
                    Cart.findOneAndUpdate({ "user": req.session.user.id, "cartItems.product": product }, {
                        "$set": {
                            "cartItems": {
                                ...req.body.cartItems,
                                quantity: item.quantity + req.body.cartItems.quantity
                        }
                    }
                })
    
                    .exec((error, _cart) => {
                        if(error) return console.log(error);
                        if(_cart) {
                            return console.log(res.status(201).json({ cart: _cart }));
                        }
                    })    

                } else {
                    Cart.findOneAndUpdate({ user: req.session.user.id }, {
                        "$push": {
                            "cartItems": req.body.cartItems
                        }
                    })
    
                    .exec((error, _cart) => {
                        if(error) return console.log(error);
                        if(_cart) {
                            return console.log(res.status(201).json({ cart: _cart }));
                        }
                    })     
                }
            }
            else {
                // if cart not exists then create a new cart

                const cart = new Cart({
                    user: req.session.user.id,
                    cartItems: [req.body.cartItems]
                });

                cart.save((error, cart) => {
                    if(error) return console.log(error);
                    if(cart) {
                        return console.log(res.status(201).json({ cart }));
                    }
                });
            }

        })
}



