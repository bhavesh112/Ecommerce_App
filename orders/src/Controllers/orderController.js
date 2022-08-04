const Order = require("../models/order");

exports.addOrder = (req, res) => {
  req.body.user = req.user.id;
  const order = new Order(req.body);
  order.save((error, order) => {
    if (error) return res.status(400).json({ error });
    if (order) {
      res.status(201).json({ order });
    }
  });
};

exports.getOrders = (req, res) => {
  Order.find({ user: req.user.id })
    .sort({
      createdAt: "desc",
    })
    .exec((error, orders) => {
      if (error) return res.status(400).json({ error });
      if (orders) {
        res.status(200).json({ orders });
      }
    });
};
