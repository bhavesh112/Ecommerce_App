
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cartRoutes = require('./routes/cart')
const app = express();

app.use(bodyParser.json());
app.use('/api', cartRoutes);

mongoose.connect('mongodb://localhost:27017/CustermerDb');
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
}).on('error', (err) => {
    console.log(err);
});

app.listen(8000, () => {
    console.log('Server is running on port 8000');
});



//mongodb+srv://Diwakar:zXqOqJ7cfZ8NMmV3@diwakar.4mhdhrx.mongodb.net/CustermerDb?retryWrites=true&w=majority