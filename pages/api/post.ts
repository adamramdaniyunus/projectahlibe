import Post from "@/models/Post";
import mongooseConnect from "@/lib/mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import User from "@/models/User";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    await mongooseConnect()
    try {
        const { video, desc, user, tags, image } = req.body

        const userExist = await User.findOne({ email: user })

        if (req.method === "POST") {
            const data = await Post.create({ video: video, desc: desc, user: userExist?._id, tags: tags, image: image })
            return res.json(data)
        }

        if (req.method === "GET") {

            if (req.query.email) {
                const userPosting = await User.findOne({ email: req.query.email })
                const data = await Post.find({ user: userPosting?._id }).populate([
                    {
                        path: "user",
                        select: ["image", "name", "email"],
                    },
                ]).sort({ createdAt: -1 });


                return res.json(data)
            }
            let search: any = req.query.search || "";
            let tags: any = req.query.tags || "";

            let tagsQuery = {};
            let searchQuery = {};

            if (tags && tags !== "all") {
                tagsQuery = { tags: { $in: [tags] } };
            }

            if (search) {
                searchQuery = { desc: { $regex: new RegExp(search.split(' ').join('|'), "i") } };
            }

            const data = await Post.find({
                ...searchQuery,
                ...tagsQuery
            }).populate([
                {
                    path: "user",
                    select: ["image", "name", "email", "verified"],
                },
            ]).sort({ createdAt: -1 });


            return res.json(data);
        }

        if (req.method === "DELETE") {
            const post = await Post.findById(req.query.id);

            if (!post) return res.json(404);

            await post.deleteOne();

            return res.json('Deleted')
        }
    } catch (error) {
        console.log(error);
        return res.status(500)
    }
}

export default handler