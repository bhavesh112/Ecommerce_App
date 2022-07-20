const Cart = require("../models/cart");
exports.addItemToCart = (req, res) => {
  // res.json({message:'cart'});
  Cart.findOne({ user: req.user.id }).exec((error, cart) => {
    //old cart
    if (error) return res.status(201).json({ error });

    if (cart) {
      const exc_item = cart.cartItems.find(
        (c) => c.product == req.body.cartItems.product
      );
      if (exc_item) {
        Cart.findOneAndUpdate(
          {
            user: req.user._id,
            "cartItems.product": req.body.cartItems.product,
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
              cartItems: req.body.cartItems,
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
        //create new cart
        user: req.user._id,
        cartItem: [req.body.cartItems],
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
