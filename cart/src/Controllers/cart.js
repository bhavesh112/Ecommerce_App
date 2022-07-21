const Cart = require("../models/cart");

exports.addItemToCart = (req, res) => {
  Cart.findOne({ user: req.user.id }).exec((error, cart) => {
    if (error) return res.status(400).json({ error });

    if (cart) {
      const product = req.body.cartItems.product;
      const exc_item = cart.cartItems.find((c) => c.product == product);
      if (exc_item) {
        Cart.findOneAndUpdate(
          {
            user: req.user.id,
            "cartItems.product": product,
          },
          {
            $set: {
              cartItems: {
                ...req.body.cartItems,
                quantity: exc_item.quantity + req.body.cartItems.quantity,
              },
            },
          }
        ).exec((error, _cart) => {
          if (error) return res.status(400).json({ error });
          if (_cart) {
            return res.status(201).json({ cart: _cart });
          }
        });
      } else {
        Cart.findOneAndUpdate(
          { user: req.user.id },
          {
            $push: {
              cartItems: [req.body.cartItems],
            },
          }
        ).exec((error, _cart) => {
          if (error) return res.status(400).json({ error });
          if (_cart) {
            return res.status(201).json({ cart: _cart });
          }
        });
      }
    } else {
      const cart = new Cart({
        user: req.user.id,
        cartItems: [req.body.cartItems],
      });
      cart.save((error, cart) => {
        if (error) return res.status(400).json({ error });

        if (cart) {
          return res.status(201).json({ cart });
        }
      });
    }
  });
};
