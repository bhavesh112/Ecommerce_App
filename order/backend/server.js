const app = require("./app");



const connectDatabase = require("./config/database");

// Connecting to database
connectDatabase();



app.listen(9000,() => {
    console.log("Server runing on port 9000...")
});


