const mongoose = require("mongoose");
const Cart = require("../models/cart");

const findCartByUserId = async (userId) => {
  const cart = await Cart.findOne({ user: userId });
  return cart;
};
const createNewCart = async (userId) => {
  const cart = new Cart({
    user: userId,
    cartItems: [],
  });
  await cart.save();
  return cart;
};

const removeItemFromCart = async (user, cartId) => {
  const cart = await Cart.updateOne(
    {
      user: user,
    },
    {
      $pull: {
        cartItems: {
          _id: cartId,
        },
      },
    }
  );
  return cart;
};

const updateCartItem = async (user, cartId, quantity) => {
  return await Cart.updateOne(
    {
      user: user,
      cartItems: {
        $elemMatch: { _id: mongoose.Types.ObjectId(cartId) },
      },
    },
    {
      $set: {
        "cartItems.$.quantity": quantity,
      },
    },
    {
      arrayFilters: [
        {
          _id: mongoose.Types.ObjectId(cartId),
        },
      ],
    }
  );
};
const removeAllCartItems = async (user) => {
  return await Cart.updateOne(
    {
      user: user,
    },
    {
      $set: {
        cartItems: [],
      },
    }
  );
};
module.exports = {
  findCartByUserId,
  createNewCart,
  removeItemFromCart,
  updateCartItem,
  removeAllCartItems,
};
