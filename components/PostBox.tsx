import ReactPlayer from "react-player";
import React, { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import ThumbIcon from "@/components/icon/ThumbIcon";
import CommentIcon from "@/components/icon/CommentIcon";
import ShareIcon from "@/components/icon/ShareIcon";
import CommentBox from "@/components/CommentBox";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { getAllCommentPost } from "@/services/comment";
import Link from "next/link";
import toast from "react-hot-toast";
import ModalConfirm from "./modal/ModalConfirm";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Verified from "./icon/Verified";

// type
type DataItem = {
    _id: string;
    desc: string;
    tags: string[];
    likes: string[];
    comments: string[];
    video: string
    image: string;
    createdAt: string
    user: {
        name: string;
        image: string;
        email: string;
        verified: boolean
    }
}
interface PostToBoxPROPS {
    data: DataItem
    refetch: () => void;
}



const PostBox: React.FC<PostToBoxPROPS> = ({ data, refetch }) => {
    const { userInfo } = useSelector((state: any) => state.user);
    const [showBar, setShowBar] = useState(false)
    const [confirm, setConfirm] = useState(false)
    const [like, setLike] = useState(data.likes && data.likes.includes(userInfo?.user.email));
    const [liked, setLiked] = useState(data.likes && data.likes.length);

    const router = useRouter();
    const { email } = router.query

    const handleLike = async () => {
        setLike(prev => !prev)
        like ? setLiked(prev => prev - 1) : setLiked(prev => prev + 1)
        await axios.post("/api/like", {
            useremail: userInfo?.user.email,
            postId: data._id
        })
    }

    // handle delete post
    const handleDeletePost = async () => {
        await axios.delete("/api/post?id=" + data._id);
        toast.success('Postingan dihapus')
        handleModal()
        refetch()
    }

    const handleModal = () => {
        setConfirm(prev => !prev)
    }

    const handleShowBar = () => {
        setShowBar(prev => !prev)
    }

    // get comments data
    const post = data
    const queryKey = ["comments", post._id];

    const {
        data: postComments,
        refetch: refetchComments,
        isLoading,
    } = useQuery({
        queryFn: () => getAllCommentPost(post._id),
        queryKey,
    });

    // generate to year month day
    const calculateTimeDifference = (createdAt: any) => {
        const currentDate: Date = new Date();
        const createdDate: Date = new Date(createdAt);
        const timeDifference: number = currentDate.getTime() - createdDate.getTime();
        const seconds = Math.floor(timeDifference / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const months = Math.floor(days / 30);

        if (months > 0) {
            return `${months} bulan yang lalu`;
        } else if (days > 0) {
            return `${days} hari yang lalu`;
        } else if (hours > 0) {
            return `${hours} jam yang lalu`;
        } else if (minutes > 0) {
            return `${minutes} menit yang lalu`;
        } else {
            return 'Baru saja';
        }
    };

    const timeAgo = calculateTimeDifference(data.createdAt);


    return (
        <div className={'flex p-4 md:px-6 px-1 gap-2 w-full flex-col md:mb-20'}>
            <div className={'border-y-2 p-2 md:w-[550px] w-[350px] flex flex-col md:mb-0 gap-2'}>
                <div className="flex justify-between">
                    <Link href={'/profile/' + data?.user.email} className={'flex gap-2 items-center'}>
                        <Image src={data?.user?.image} loader={() => data?.user.image} alt="profile" width={0} height={0} className="w-6 rounded-lg" />
                        <p className="text-gray-600 font-semibold flex ">{data?.user.name}{data?.user.verified && <span><Verified /></span>}</p>
                    </Link>

                    <div>
                        <p className="text-gray-500 text-sm">{timeAgo}</p>
                    </div>
                </div>
                <div className={'py-2 font-semibold'}>
                    <h1 className={'text-md text-gray-700'}>{data.desc}</h1>
                </div>
                <div className={'flex'}>
                    {data?.video && <div>
                        <ReactPlayer
                            width="100%"
                            height=""
                            url={data.video}
                            controls={true}
                            // light is usefull incase of dark mode
                            light={false}
                            // picture in picture
                            pip={false}
                            disablePictureInPicture={true}
                        />
                        <source src={data.video} type="video/mp4" />
                    </div>}

                    {data?.image && <div>
                        {/* <img src={data.image} alt="" className="w-full h-auto" /> */}
                        <Image
                            src={data?.image}
                            width={600}
                            height={600}
                            alt="Postingan"
                        />
                    </div>}
                </div>
                <div className={'flex mt-1 flex-wrap gap-2 items-center'}>
                    {data.tags.length > 0 && data.tags.map((tag, i) => (
                        <div key={i} className={'tags-list bg-blue-200 lowercase italic font-semibold px-4 py-1 rounded-lg flex'}>#{tag}</div>
                    ))}
                </div>

                <div className={'px-4 py-2 gap-2 flex justify-between'}>
                    {email && data?.user?.email === userInfo?.email ? <button onClick={handleModal}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="red" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                    </button> : <div></div>}
                    <div className={'flex gap-1'}>
                        {userInfo ? (
                            <div className="flex gap-1">
                                <button onClick={handleLike} className={`flex gap-1 items-center ${like ? "text-blue-600" : ""} active:scale-90 `}>{liked}{like ? <ThumbIcon isLiked={true} /> : <ThumbIcon isLiked={false} />}</button>
                                <button onClick={handleShowBar} className={'flex gap-1 items-center active:scale-90'}>
                                    {isLoading ? <p>
                                        Loading...
                                    </p> : postComments?.length}
                                    <CommentIcon /></button>
                                <button><ShareIcon /></button>
                            </div>
                        ) : (
                            <button onClick={() => signIn('google')} className={'button text-black'}>Login with Google</button>
                        )}

                    </div>
                </div>
            </div>
            <CommentBox handleShowBar={handleShowBar} showBar={showBar} data={data} comments={postComments} refetch={refetchComments} />

            {confirm && <ModalConfirm handleModal={handleModal} handleDeletePost={handleDeletePost} />}

            {showBar && <div onClick={handleShowBar} className={`fixed z-[54] top-0 left-0 h-screen w-screen bg-black bg-opacity-40`}>
            </div>}
        </div>
    )
}

export default PostBox