import Post from "@/models/Post";
import mongooseConnect from "@/lib/mongoose";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    await mongooseConnect()
    try {

        const { useremail, postId } = req.body
        const data = await Post.findById(postId);

        if (data?.likes.includes(useremail)) {
            await data?.updateOne({
                $pull: {
                    likes: useremail
                }
            })
            await data?.save()
            res.json("unliked")
        } else {
            await data?.updateOne({
                $push: {
                    likes: useremail
                }
            })
            await data?.save()

            res.json("liked")
        }

    } catch (error) {
        console.log(error);
        return res.status(500)
    }
}

export default handler