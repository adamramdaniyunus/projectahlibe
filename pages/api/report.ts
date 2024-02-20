import Report from "@/models/Report";
import mongooseConnect from "@/lib/mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import User from "@/models/User";
import path from "path";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    await mongooseConnect()
    try {
        const { desc, user, post } = req.body
        if (req.method === "POST") {

            const userId = await User.findOne({ email: user })

            await Report.create({
                desc: desc,
                user: userId?._id,
                post: post,
            });

            return res.json("oke");
        }

        if (req.method === "GET") {
            const data = await Report.find().populate([
                {
                    path: "user",
                    select: ["image", "name", "email"],
                },
                {
                    path: "post",
                    select: ["desc", "image", "video"],
                    populate: [
                        {
                            path: "user",
                            select: ["image", "name"],
                        },
                    ],
                }
            ]);
            return res.json(data);
        }

    } catch (error) {
        console.log(error);
        return res.status(500)
    }
}

export default handler