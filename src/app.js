const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/user.model.js");
const userRoute = require("./routes/userRoute.js");
const postRoute = require("./routes/postRoute.js")
const app = express();
const uri = "mongodb+srv://erechoum:3xK.ytvbZxxPmpG@cluster0.ou8vg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

// middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));


// routes
app.use("/api/users", userRoute);
app.use("/api/posts",postRoute)




app.get("/", (req, res) => {
  res.send("Hello from Node API Server Updated");
});


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