import mongoose from "mongoose";

 async function conectDB(){


        if(mongoose.connections[0].readyState) return;

        await mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log("Conenct To DB"))
       

    

}


export default conectDB ;