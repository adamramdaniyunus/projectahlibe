import mongooseConnect from "@/lib/mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import Tags from "@/models/Tags";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    await mongooseConnect()
    try {
        const { nameTags } = req.body
        console.log(nameTags);

        if (req.method === "GET") {
            const tags = await Tags.find();
            return res.json(tags);
        }

        if (req.method === "POST") {
            const newtags = await Tags.create({ name: nameTags });
            return res.json(newtags);
        }

    } catch (error) {
        console.log(error);
        return res.status(500)
    }
}

export default handler