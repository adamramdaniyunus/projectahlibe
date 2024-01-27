import CloseIcon from "@/components/icon/CloseIcon";
import React, { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { getAllCommentPost } from "@/services/comment";
import toast from "react-hot-toast";

// types
interface CommentBoxProps {
    handleShowBar: () => void;
    showBar: boolean
    comments: CommentItem[];
    data: DataItem;
    refetch: () => void;
}

type DataItem = {
    _id: string;
    desc: string;
    tags: string[];
    user: {
        name: string;
        image: string
    }
    likes: string[];
    comments: string[];
    video: string
    image: string;
    createdAt: string
}

type CommentItem = {
    desc: string
    user: {
        name: string;
        image: string;
        _id: string;
    }
    createdAt: string;
    post: string;
    replyOnUserName: string;
    _id: string;
    replies: [
        {
            user: {
                name: string;
                image: string;
                _id: string;
            }
            desc: string;
            createdAt: string;
            replyOnUserName: string;
            replyOnUser: string;
            _id: string;
            replies: [
                {
                    user: {
                        name: string;
                        image: string;
                        _id: string;
                    }
                    desc: string;
                    createdAt: string;
                    replyOnUserName: string;
                    replyOnUser: string;
                    _id: string;
                    replies: string[];
                }
            ]
        }
    ]
    replyOnUser: string;
    parent: string;
}


// this for hightlight username
const HighlightUsername = ({ text, username }: { text: any, username: any }) => {
    const parts = text.split(username);


    return (
        <p className={'text-lg text-gray-600'}>
            {parts.map((part: string, index: number) => (
                <React.Fragment key={index}>
                    <span className="text-sm">
                        {index > 0 && <span className="font-bold text-blue-800">{username}</span>}
                        {part}
                    </span>
                </React.Fragment>
            ))}
        </p>
    );
};




const CommentBox: React.FC<CommentBoxProps> = ({ handleShowBar, showBar, data, comments, refetch }) => {
    const { data: session } = useSession()
    const user = session?.user || null
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    const [desc, setDesc] = useState<string>('')
    const [toUser, setReplyOnUser] = useState('')
    const [userId, setUserId] = useState('')
    useEffect(() => {
        // Focus on the textarea element when the value is updated
        if (textareaRef.current) {
            textareaRef.current.focus();
        }
    }, [desc]);
    const handleTextareaInput = () => {
        const textarea = textareaRef.current
        if (textarea) {
            const maxHeight = 300;
            textarea.style.height = 'auto'
            textarea.style.height = textarea.scrollHeight + 'px'
            textarea.style.height = Math.min(textarea.scrollHeight, maxHeight) + 'px';
        }
    }

    // handle click reply button

    const handleComment = (username: string, commentId: string, userId: string) => {
        setReplyOnUser(commentId)
        setUserId(userId)
        setDesc(username)
    }

    // add new comment
    const handlerAddComment = async (e: any) => {
        e.preventDefault();

        try {
            await axios.post('/api/comment?postId=' + data._id, {
                useremail: user?.email,
                toUser: toUser,
                userId: userId,
                desc
            })
            refetch()
            toast.success("Komentar dikirim");
            setDesc('')
            setReplyOnUser('')
            setUserId('')
        } catch (error) {
            console.log(error);

        }
    }

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

    // mapping times
    const times = comments?.map((comment: CommentItem) => {
        return calculateTimeDifference(comment?.createdAt);
    });


    const replyTimes = comments?.map((comment: CommentItem) => {
        return comment.replies.map((repliesComment) => {
            return calculateTimeDifference(repliesComment?.createdAt);
        });
    }).flat();



    return (
        <div
            className={`fixed flex flex-col justify-between z-[55] top-0 right-0 h-screen rounded-md transition-all p-3 bg-white ${showBar ? "left-0 md:left-2/3" : "left-[100%]"}`}>
            <div className={'flex p-4 justify-between border-b-2 border-black'}>
                <h1 className={'text-2xl font-semibold'}>BroComment</h1>
                <button onClick={handleShowBar}><CloseIcon /></button>
            </div>

            <div className={'h-full overflow-auto'}>
                {comments?.length > 0 ? (
                    comments?.filter((comment) => comment.parent === null).map((comment: CommentItem, i: number) => (
                        <div key={i} className={'flex flex-col gap-2 mt-3  '}>
                            <div className="flex gap-2 relative p-4 border-b-2">
                                <div className={'items-center'}>
                                    <img src={comment?.user?.image || ""} alt="profile" className={'h-6 w-6 mt-1 rounded-full'} />
                                </div>
                                <div className={'flex flex-col'}>
                                    <p className={'text-gray-600 text-sm font-semibold flex items-center gap-4'}>{comment.user?.name} <span
                                        className={'text-gray-600 text-xs'}>{times[i]}</span></p>
                                    <HighlightUsername text={comment?.desc} username={comment?.replyOnUserName} />
                                </div>

                                <button onClick={() => handleComment(comment.user.name, comment?._id, comment?.user._id)} className="absolute right-20 text-gray-500 text-sm font-bold mt-10 md:mt-2 bottom-0">Balas</button>
                            </div>
                            {comment.replies.length > 0 && (
                                <div>
                                    {comment.replies.map((replyComment, j: number) => (
                                        <div key={j} className="flex border-l-2 flex-col gap-2 ml-10 p-4 ">
                                            <div className="flex gap-2 p-4 relative border-b-2">
                                                <div className={'items-center'}>
                                                    <img src={replyComment?.user?.image || ""} alt="profile" className={'h-6 w-6 mt-1 rounded-full'} />
                                                </div>
                                                <div className={'flex flex-col'}>
                                                    <p className={'text-gray-600 text-sm font-semibold flex items-center gap-4'}>{replyComment.user?.name}  <span
                                                        className={'text-gray-600 text-xs'}>{replyTimes[j]}</span></p>
                                                    <HighlightUsername text={replyComment?.desc} username={replyComment?.replyOnUserName} />
                                                </div>
                                                <button onClick={() => handleComment(replyComment.user.name, comment?._id, replyComment?.user._id)} className="absolute right-10 text-gray-500 text-sm font-bold bottom-0">Balas</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}


                        </div>
                    ))
                ) : <div className="w-full flex justify-center p-4">Belum ada komentar</div>}
            </div>



            <div className={' bottom-4 left-0 p-4 w-full flex-col'}>
                <h1 className={'text-xl font-semibold text-gray-600 px-1 py-4'}>Kirim Komentar</h1>
                <form className={'w-full'} onSubmit={handlerAddComment}>
                    <div className={'comment-container w-full flex gap-2'}>
                        {/*<input type="text" className={''} placeholder={"Good Game"}/>*/}
                        <textarea
                            ref={textareaRef}
                            value={desc}
                            autoFocus={true}
                            onChange={e => setDesc(e.target.value)}
                            className={'mb-10 w-full bg-red-400'}
                            onInput={handleTextareaInput}
                            placeholder="Good Game.."
                        ></textarea>
                        {/* <input type={"file"} className={'hidden'} id={'sticker'} />
                        <label htmlFor={'sticker'} className={'cursor-pointer p-4 flex items-center'}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                                stroke="#A9B388" className="w-8 h-8">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                    d="M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
                            </svg>
                        </label> */}
                        <button className="px-4 py-1 text-white font-semibold bg-green-400 rounded-lg">Send</button>
                    </div>
                </form>
            </div>
        </div>
    )
}


export default CommentBox