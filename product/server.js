const express = require('express');
const bodyParser = require('body-parser');
const env=require('dotenv');
const mongoose = require('mongoose');
const productRoutes = require('./routes/productRoutes');
const app = express();


app.use(bodyParser.json());


app.use('/api/v1', productRoutes);

env.config();

mongoose.connect('mongodb+srv://mongoadmin:LVk07L9pyRQY6isa@deep.ub6l5.mongodb.net/ProductDB?retryWrites=true&w=majority');
mongoose.connection.once('open', () => {
    console.log('Connected to DB');
}).on('error', (err) => {
    console.log(err);
});


let port = process.env.PORT || 8000
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});