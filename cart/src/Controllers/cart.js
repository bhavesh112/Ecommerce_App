const Cart = require("../models/cart");

exports.addItemToCart = async (req, res) => {
  const { name, price, quantity, productPicture } = req.body;
  const user_id = req.user.id;
  const existingCart = await Cart.findOne({ user: user_id });

  if (existingCart) {
    const cartItem = {
      name,
      price,
      quantity,
      productPicture,
    };
    existingCart.cartItems.push(cartItem);
    existingCart.save((error, cart) => {
      if (error) {
        return res.status(400).json({ error });
      }
      if (cart) {
        return res.status(200).json({ cart });
      }
    });
  }
  const newCart = new Cart({
    user: user_id,
    cartItems: [
      {
        name,
        price,
        quantity,
        productPicture,
      },
    ],
  });
  newCart.save((error, cart) => {
    if (error) {
      return res.status(400).json({ error });
    }
    if (cart) {
      return res.status(200).json({ cart });
    }
  });
};

exports.getCartItems = async (req, res) => {
  try {
    const user_id = req.user.id;
    const cart = await Cart.findOne({
      user: user_id,
    });
    if (!cart) {
      const newCart = await Cart.create({
        user: user_id,
        cartItems: [],
      });
      return res.status(200).json({ newCart });
    }
    return res.status(200).json({
      cart,
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

exports.removeCartItems = async (req, res) => {
  try {
    const user = req.user.id;
    const cart = await Cart.findOne({ user: user });
    const { id } = req.params;
    const cartItem = cart.cartItems.find((item) => item._id.toString() === id);
    const index = cart.cartItems.indexOf(cartItem);
    cart.cartItems.splice(index, 1);
    await cart.save();
    return res.json({ cart });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

exports.updateCartItems = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      user: req.user.id,
    });
    const { id } = req.params;
    const cartItem = cart.cartItems.find((item) => item._id.toString() === id);
    cartItem.quantity = req.body.quantity;
    await cart.save();
    res.json({
      cart,
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
