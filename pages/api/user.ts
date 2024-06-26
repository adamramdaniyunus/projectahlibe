import mongooseConnect from "@/lib/mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import User from "@/models/User";
import {images} from "next/dist/build/webpack/config/blocks/images";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    await mongooseConnect()
    try {

        if (req.method === "GET") {
            if (req.query.id) {
                const user = await User.findOne({ email: req.query.id });
                return res.json(user)
            }

            if (req.query.userId) {
                const userId: any = req.query.userId
                const user = await User.findById(userId);
                return res.json(user)
            }

            const user = await User.find();
            return res.json(user);
        }
        if (req.method === "PUT") {
            const { desc, name,image } = req.body;
            const user = await User.findOne({ email: req.query.email });

            if (!user) return res.status(404);

            await user.updateOne({ desc: desc, name: name,image:image });

            return res.json("updated")

        }
    } catch (error) {
        console.log(error);
        return res.status(500)
    }
}

export default handler