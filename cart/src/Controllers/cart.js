const mongoose = require("mongoose");
const Cart = require("../models/cart");
const {
  findCartByUserId,
  createNewCart,
  removeItemFromCart,
  updateCartItem,
  removeAllCartItems,
} = require("../repository/cart.repository");

exports.addItemToCart = async (req, res) => {
  try {
    const { name, price, quantity, productPicture, productId } = req.body;
    const user_id = req.user.id;
    const existingCart = await findCartByUserId(user_id);

    if (existingCart) {
      const cartItem =
        existingCart.cartItems.length &&
        existingCart.cartItems.find(
          (item) => item?.productId.toString() === productId
        );

      if (cartItem) {
        cartItem.quantity += quantity;
      } else {
        const cartData = {
          productId,
          name,
          price,
          quantity,
          productPicture,
        };
        existingCart.cartItems.push(cartData);
      }
      await existingCart.save();
      return res.status(200).json({ cart: existingCart });
    }
    const newCart = new Cart({
      user: user_id,
      cartItems: [
        {
          name,
          price,
          quantity,
          productPicture,
          productId,
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
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: err.message });
  }
};

exports.getCartItems = async (req, res) => {
  try {
    const user_id = req.user.id;

    const cart = await findCartByUserId(user_id);
    if (!cart) {
      const newCart = await createNewCart(user_id);
      return res.status(200).json({ cart: newCart });
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
    const cart = await removeItemFromCart(user, req.params.id);

    if (cart.nModified === 0) {
      return res.status(400).json({ msg: "Item not found" });
    }
    return res.status(200).json({ msg: "Item removed from cart" });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

exports.updateCartItems = async (req, res) => {
  try {
    const user = req.user.id;
    const quantity = req.body.quantity;
    const cartId = req.params.id;
    const cart = await updateCartItem(user, cartId, quantity);

    if (cart.modifiedCount === 0) {
      return res.status(400).json({ msg: "Item not found" });
    }
    return res.json({ cart });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

exports.removeAllItems = async (req, res) => {
  try {
    const user = req.user.id;
    const cart = await removeAllCartItems(user);

    if (cart.n === 0) {
      return res.status(400).json({ msg: "No items found" });
    }
    return res.json({ msg: "All items removed from cart" });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
