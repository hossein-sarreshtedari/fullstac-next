import conectDB from "@/utils/conectDB";
import User from "@/models/User";



export default async function handler(req, res) {


    //conent to DB
    try {

        await conectDB();
    }
    catch (error) {

        console.log(error);
        res.status(500).json({ status: false, message: "Error when Conecting to DB" });
        return;
    }


    if (req.method === "GET") {

        try {

            const users = await User.find();
            res.status(200).json({status : true , data : users});

         }
        catch (error) {

            console.log(error);
            res.status(500).json({ status: false, message: "Error when geting data from DB" })
        }
    }

    if (req.method === "POST") {

        const body = req.body;


        //save to DB
        try {

            const user = await User.create(body);
            res.status(201).json({ status: true, message: "add succsessfuly user" })


        }
        catch (error) {

            console.log(error);
            res.status(500).json({ status: false, message: "Error when save to DB" })
        }


    }



}