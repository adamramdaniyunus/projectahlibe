import CloseIcon from "@/components/icon/CloseIcon";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Image from "next/image";
import { useSelector } from "react-redux";
import Verified from "./icon/Verified";
import { calculateTimeDifference } from "./TimeSet";

// types
interface CommentBoxProps {
    handleShowBar: () => void;
    showBar: boolean
    comments: CommentItem[];
    data: DataItem;
    refetch: () => void;
}


// this for hightlight username
export const HighlightUsername = ({ text, username }: { text: any, username: any }) => {
    const parts = text.split(username);


    return (
        <p className={'text-lg text-white'}>
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
    const { userInfo } = useSelector((state: any) => state.user)
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    const [desc, setDesc] = useState<string>('')
    const [toUser, setReplyOnUser] = useState('')
    const [userId, setUserId] = useState('')
    const [sendingComment, setLoading] = useState<boolean>(false)
    const [showReply, setShowReply] = useState(false);

    useEffect(() => {
        // Focus on the textarea element when the value is updated
        if (textareaRef.current && showBar || desc !== '') {
            textareaRef.current?.focus();
        }
    }, [showBar, desc]);
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
            setLoading(true);
            await axios.post('/api/comment?postId=' + data._id, {
                useremail: userInfo?.user.email,
                toUser: toUser,
                userId: userId,
                desc
            });
            setLoading(false)
            refetch()
            toast.success("Komentar dikirim");
            setDesc('')
            setReplyOnUser('')
            setUserId('')
        } catch (error) {
            console.log(error);

        }
    }

    const commentTimes: { [key: string]: string } = {};
    // mapping times
    comments?.forEach((comment: CommentItem) => {
        commentTimes[comment._id] = calculateTimeDifference(comment.createdAt);
    });


    // this for enter press
    const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handlerAddComment(e);
        }
    };


    return (
        <div
            className={`fixed flex flex-col justify-between z-[55] top-0 right-0 h-screen rounded-md transition-all p-3 bg-primary ${showBar ? "left-0 lg:left-2/3" : "left-[100%]"}`}>
            <div className={'flex p-4 justify-between border-b-2 border-white'}>
                <h1 className={'text-2xl font-semibold text-white'}>BroComment</h1>
                <button onClick={handleShowBar}><CloseIcon /></button>
            </div>

            <div className={'h-full overflow-auto'}>
                {comments?.length > 0 ? (
                    comments?.filter((comment) => comment.parent === null).map((comment: CommentItem, i: number) => (
                        <div key={i} className={'flex flex-col gap-2 mt-3  '}>
                            <div className="flex gap-2 relative p-4">
                                <div className={'items-center'}>
                                    <Image src={comment?.user?.image || ""} alt="profile" height={0} width={0} loader={() => comment?.user?.image || ""} className={'h-6 w-6 mt-1 rounded-full'} />
                                </div>
                                <div className={'flex flex-col'}>
                                    <div className="flex gap-4">
                                        <p className={'text-white text-sm font-semibold flex items-center'}>{comment.user?.name}{comment?.user.verified && <span className="mb-1"><Verified /></span>}
                                        </p>
                                        <span
                                            className={'text-white font-semibold text-xs'}>{commentTimes[comment?._id]}
                                        </span>
                                    </div>
                                    <HighlightUsername text={comment?.desc} username={comment?.replyOnUserName} />
                                </div   >

                                <button onClick={() => handleComment(comment.user.name, comment?._id, comment?.user._id)} className="absolute right-20 text-gray-500 text-sm font-bold mt-10 md:mt-2 bottom-0">Balas</button>
                            </div>
                            {comment.replies.length > 0 && !showReply && <p className={'text-sm text-gray-500 flex justify-start px-6 cursor-pointer'} onClick={()=>{
                                setShowReply(prev =>!prev)
                            }}>Show reply</p>}
                            {showReply && comment.replies.length > 0 && (
                                <div>
                                    {comment.replies.map((replyComment, j: number) => (
                                        <div key={j} className="flex border-l-2 flex-col gap-2 ml-8 p-2 ">
                                            <div className="flex gap-2 p-4 relative">
                                                <div className={'items-center'}>
                                                    <Image src={replyComment?.user?.image || ""} alt="profile" height={0} width={0} loader={() => replyComment?.user?.image || ""} className={'h-6 w-6 mt-1 rounded-full'} />
                                                </div>
                                                <div className={'flex flex-col'}>
                                                    <div className="flex gap-4">
                                                        <p className={'text-white text-sm font-semibold flex items-center'}>{replyComment.user?.name}{replyComment?.user.verified && <span className="mb-1"><Verified /></span>}
                                                        </p>
                                                        <span
                                                            className={'text-white font-semibold text-xs'}>{commentTimes[replyComment?._id]}
                                                        </span>
                                                    </div>
                                                    <HighlightUsername text={replyComment?.desc} username={replyComment?.replyOnUserName} />
                                                </div>
                                                <button onClick={() => handleComment(replyComment.user.name, comment?._id, replyComment?.user._id)} className="absolute right-10 text-gray-500 text-sm font-bold bottom-0">Balas</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {comment.replies.length>0 && showReply && <p className={'text-sm text-gray-500 px-6 cursor-pointer'} onClick={()=>{
                                setShowReply(false)
                            }}>Hide reply</p>}

                        </div>
                    ))
                ) : <div className="w-full flex justify-center p-4 text-white">Belum ada komentar</div>}
            </div>



            <div className={'p-4 w-full flex-col mb-10 md:mb-2'}>
                <h1 className={'text-xl font-semibold text-gray-600 px-1 py-4 text-gray-400'}>Kirim Komentar</h1>
                <form className={'w-full'} onSubmit={handlerAddComment}>
                    <div className={'comment-container w-full flex gap-2'}>
                        <textarea
                            ref={textareaRef}
                            value={desc}
                            onKeyDown={handleKeyPress}
                            onChange={e => setDesc(e.target.value)}
                            className={'mb-10 w-full max-h-[50px] text-white'}
                            onInput={handleTextareaInput}
                            placeholder="Good Game.."
                            style={{ color: 'white' }}
                        ></textarea>
                        {/* <input type={"file"} className={'hidden'} id={'sticker'} />
                        <label htmlFor={'sticker'} className={'cursor-pointer p-4 flex items-center'}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                                stroke="#A9B388" className="w-8 h-8">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                    d="M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
                            </svg>
                        </label> */}
                        <button disabled={sendingComment || desc === ""} className="px-4 py-1 text-white font-semibold bg-green-400 rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed">Send</button>
                    </div>
                </form>
            </div>
        </div>
    )
}


export default CommentBox