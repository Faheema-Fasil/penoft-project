const mongoose=require('mongoose')
const connectionString=process.env.Mongodb_connection
mongoose.connect(connectionString).then(()=>{
    console.log("MongoDB Atlas connected succesfully to server");
    
}).catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
  })