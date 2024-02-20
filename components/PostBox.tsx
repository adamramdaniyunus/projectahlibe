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
import { useDispatch, useSelector } from "react-redux";
import Verified from "./icon/Verified";
import MenuIcon from "./icon/MenuIcon";
import { deletePost } from "@/services/post";
import BackgroundBlack from "./BackgroundBlack";
import ModalReport from "./modal/ModalReport";
import { calculateTimeDifference } from "./TimeSet";

// type
interface PostToBoxPROPS {
    data: DataItem
    refetch: () => void;
}



const PostBox: React.FC<PostToBoxPROPS> = ({ data, refetch }) => {
    const { userInfo } = useSelector((state: any) => state.user);
    const [showBar, setShowBar] = useState(false)
    const [confirm, setConfirm] = useState(false)
    const [like, setLike] = useState(data?.likes && data?.likes.includes(userInfo?.user.email));
    const [liked, setLiked] = useState(data?.likes && data?.likes.length);
    const [loading, setLoading] = useState(false)
    const [report, setReport] = useState(false)
    const router = useRouter();
    const { email } = router.query

    const handleLike = async () => {
        setLike(prev => !prev)
        like ? setLiked(prev => prev - 1) : setLiked(prev => prev + 1)
        await axios.post("/api/like", {
            useremail: userInfo?.user.email,
            postId: data?._id
        })
    }


    // handle delete post
    const handleDeletePost = async () => {
        const url: any = data?.image ?? data?.video
        setLoading(true)
        await deletePost(url, data?._id)
        setLoading(false)
        toast.success('Postingan dihapus')
        handleModal()
        refetch()
    }
    ///////////// this for modal function button //////////
    const handleModal = () => {
        setConfirm(prev => !prev)
    }

    const handleShowBar = () => {
        setShowBar(prev => !prev)
    }

    const handleModalReport = () => {
        setReport(prev => !prev)
    }

    const copyPath = () => {
        const path = window.location.origin + "/p/" + (data?._id || "");
        navigator.clipboard.writeText(path)
        toast.success("Berhasil disalin ke clipboard")
    }

    ///////////////////////////////////////////////////////
    // get comments data
    const post = data
    const queryKey = ["comments", post?._id];

    const {
        data: postComments,
        refetch: refetchComments,
        isLoading,
    } = useQuery({
        queryFn: () => getAllCommentPost(post._id),
        queryKey,
    });


    const timeAgo = calculateTimeDifference(data?.createdAt);


    return (
        <div>
            <div className={'border-y-2 p-2 md:w-[450px] w-[320px] flex flex-col md:mb-0 gap-2'}>
                <div className="flex justify-between">
                    <Link href={'/profile/' + data?.user?.email} className={'flex gap-2 items-center'}>
                        <Image src={data?.user?.image} loader={() => data?.user.image} alt="profile" width={0} height={0} className="w-6 rounded-lg" />
                        <p className="text-gray-600 font-semibold flex ">{data?.user?.name}{data?.user?.verified && <span><Verified /></span>}</p>
                    </Link>

                    <div className="flex gap-2 items-center">
                        <p className="text-gray-500 text-sm">{timeAgo}</p>
                        <button className="text-sm cursor-pointer active:scale-90" onClick={handleModalReport}><MenuIcon /></button>
                    </div>
                </div>
                <div className={'py-2 font-semibold'}>
                    <h1 className={'text-md text-gray-700'}>{data?.desc}</h1>
                </div>
                <div className={'flex'}>
                    {data?.video && <div className="rounded-md">
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
                        <source src={data?.video} type="video/mp4" />
                    </div>}

                    {data?.image && <div>
                        {/* <img src={data.image} alt="" className="w-full h-auto" /> */}
                        <Image
                            src={data?.image}
                            width={400}
                            height={400}
                            alt="Postingan"
                            className="rounded-md max-h-[500px] w-auto"
                        />
                    </div>}
                </div>
                <div className={'flex mt-1 flex-wrap gap-2 items-center'}>
                    {data?.tags?.length > 0 && data?.tags?.map((tag, i) => (
                        <div key={i} className={'tags-list bg-primary lowercase italic font-semibold px-4 py-1 rounded-lg flex'}>#{tag}</div>
                    ))}
                </div>

                <div className={'px-4 py-6 gap-2 flex justify-between relative'}>
                    {/* only admin or user post can delete */}
                    {email && data?.user?.email === userInfo?.user?.email || userInfo?.user?.email === "adamramdani1122@gmail.com" ? <button onClick={handleModal} className="active:scale-90">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="red" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                    </button> : <div></div>}
                    <div className={'flex flex-col gap-1'}>
                        {userInfo ? (
                            <div className="flex gap-1">
                                <button onClick={handleLike} className={`flex gap-1 items-center ${like ? "text-blue-600" : ""} active:scale-90 `}>{like ? <ThumbIcon isLiked={true} /> : <ThumbIcon isLiked={false} />}</button>
                                <button onClick={handleShowBar} className={'flex gap-1 items-center active:scale-90'}>
                                    <CommentIcon /></button>
                                <button onClick={copyPath} className={"active:scale-90"}><ShareIcon /></button>
                            </div>
                        ) : (
                            <button onClick={() => signIn('google')} className={'button text-black'}>Login with Google</button>
                        )}
                        <div className="absolute left-0 bottom-0">
                            <div className="flex gap-2">
                                <p className="text-sm text-gray-400">{liked} suka</p>
                                <p className="text-sm text-gray-400">{postComments?.length} komentar</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <CommentBox handleShowBar={handleShowBar} showBar={showBar} data={data} comments={postComments} refetch={refetchComments} />

            {confirm && <ModalConfirm handleModal={handleModal} handleDeletePost={handleDeletePost} loading={loading} />}

            {showBar && <BackgroundBlack handleShowBar={handleShowBar} />}

            {report && <ModalReport handleShowReport={handleModalReport} data={data?._id} report={report} />}
        </div>
    )
}

export default PostBox