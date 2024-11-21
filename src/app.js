const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/user.model.js");
const userRoute = require("./routes/userRoute.js");
const postRoute = require("./routes/postRoute.js")
const app = express();
require('dotenv').config()
const uri = process.env.URI;
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use("/users", userRoute);
app.use("/posts",postRoute);

async function run() {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    app.listen(3000,()=>{
      console.log("Listening on port 3000");
    })
  
}
run().catch(console.dir);