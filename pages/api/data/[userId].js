import conectDB from "@/utils/conectDB";
import User from "@/models/User";

export default async function (req, res) {

    //conent to DB
    try {

        await conectDB();
    }
    catch (error) {

        console.log(error);
        res.status(500).json({ status: false, message: "Error when Conecting to DB" });
        return;
    }

    const id = req.query.userId;


    if (req.method === "GET") {

        try {


            const users = await User.findById(id);
            res.status(200).json({ status: true, data: users });

        }
        catch (error) {


            // console.log(error);
            res.status(500).json({ status: false, message: "Error when geting data from DB" })
        }
    }
    else if (req.method === "PATCH") {

        try {

            const user = await User.findById(id);
            user.email = req.body.email;
            await user.save();
            res.status(200).json({ status: true, message: "update successful", data: user })
        }
        catch (error) {

            console.log(error);
            res.status(500).json({ status: false, message: "Error when Updating data" });
            return;
        }
    }
    else if (req.method === "DELETE") {

        try {
            await User.findOneAndDelete({ _id: id });
            res.status(200).json({ status: true, message: "Delete successful" })
        }
        catch (error) {

            console.log(error);
            res.status(500).json({ status: false, message: "Error when deliting data" });
            
        }
    }
    
}





