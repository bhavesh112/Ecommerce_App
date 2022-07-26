const { default: mongoose } = require("mongoose");
const Cart = require("../models/cart");

exports.addItemToCart = async (req, res) => {
  try {
    const { name, price, quantity, productPicture, productId } = req.body;
    const user_id = req.user.id;
    const existingCart = await Cart.findOne({ user: user_id });

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
    const cart = await Cart.findOne({
      user: user_id,
    });
    if (!cart) {
      const newCart = await Cart.create({
        user: user_id,
        cartItems: [],
      });
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
    const cart = await Cart.updateOne(
      {
        user: user,
      },
      {
        $pull: {
          cartItems: {
            _id: req.params.id,
          },
        },
      }
    );
    if (cart.nModified === 0) {
      return res.status(400).json({ msg: "Item not found" });
    }
    return res.json({ msg: "Item removed from cart" });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

exports.updateCartItems = async (req, res) => {
  try {
    const user = req.user.id;
    const quantity = req.body.quantity;
    const cartId = req.params.id;
    const cart = await Cart.updateOne(
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
    if (cart.modifiedCount === 0) {
      return res.status(400).json({ msg: "Item not found" });
    }
    return res.json({ cart });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
