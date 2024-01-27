import Comment from "@/models/Comment";
import mongooseConnect from "@/lib/mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import Post from "@/models/Post";
import User from "@/models/User";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    await mongooseConnect()
    try {
        const { postId } = req.query

        const post = await Post.findById(postId);
        if (!post) return res.status(404).json("Postingan tidak ada")

        if (req.method === "GET") {
            const data = await Comment.find({ post: postId })
                .populate([
                    {
                        path: "user",
                        select: ["image", "name"],
                    },
                    {
                        path: "replies",
                        populate: [
                            {
                                path: "user",
                                select: ["image", "name"],
                            },
                        ],
                    },
                ])
                .sort({ createdAt: -1 });

            return res.json(data);

        }

        if (req.method === "POST") {
            const { desc, useremail, toUser, userId } = req.body;
            const user = await User.findOne({ email: useremail })

            // if the user reply comment only
            if (toUser && userId) {
                const replyUser = await User.findById(userId)
                const comment = await Comment.findById(toUser);
                const newComment = {
                    desc,
                    post: post?._id,
                    user: user?._id,
                    parent: comment._id,
                    replyOnUser: replyUser?._id,
                    replyOnUserName: replyUser?.name
                }

                await Comment.create(newComment)

                return res.json("OKE")

            }

            const newComment = {
                desc,
                post: post?._id,
                user: user?._id,
                parent: null,
                replyOnUser: null,
                replyOnUserName: null
            }

            await Comment.create(newComment)

            return res.json("OKE")
        }
    } catch (error) {
        console.log(error);
        return res.status(500)
    }
}

export default handler