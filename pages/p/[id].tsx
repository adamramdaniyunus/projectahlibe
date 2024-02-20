import { HighlightUsername } from '@/components/CommentBox';
import Header from '@/components/Header';
import PostBox from '@/components/PostBox';
import { calculateTimeDifference } from '@/components/TimeSet';
import Verified from '@/components/icon/Verified';
import { getAllCommentPost } from '@/services/comment';
import { getOnePost } from '@/services/post';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { MoonLoader } from 'react-spinners';

const DetailPost = () => {

    const router = useRouter();
    const { id }: any = router.query
    if (!id) return

    const {
        data: postData,
        refetch: refetchDataPost,
        isFetching: fetchingDataPost,
        isLoading: loadingPost,
    } = useQuery({
        queryFn: () => getOnePost(id),
        queryKey: ["detailpost", id],
        staleTime: 30 * 60 * 1000, //ini akan di refresh ketika sudah 30 dmnit
        enabled: !!id
    });

    useEffect(() => {
        refetchDataPost();
    }, []);

    const queryKey = ["comments", postData?._id];

    const {
        data: postComments,
        refetch: refetchComments,
        isLoading,
    } = useQuery({
        queryFn: () => getAllCommentPost(postData?._id),
        queryKey,
    });

    const commentTimes: { [key: string]: string } = {};
    // mapping times
    postComments?.forEach((comment: CommentItem) => {
        commentTimes[comment._id] = calculateTimeDifference(comment.createdAt);
    });

    return (
        <div className='flex justify-center w-full mt-16 h-screen overflow-auto'>
            <Header id={id} setShowReport={() => { }} email={''} setShowTags={() => { }} refetchDataPost={() => { }} />
            {fetchingDataPost ? <div className="h-screen flex justify-center">
                <MoonLoader color="#756AB6" size={70} className="mt-20 md:mr-100 mr-0" />
            </div> : <div className='mt-4 flex flex-col h-full overflow-auto mb-0 md:mb-[4.5rem]'>
                <PostBox data={postData} refetch={() => { }} />

                <div className={''}>
                    {postComments?.length > 0 ? (
                        postComments?.filter((comment: any) => comment.parent === null).map((comment: CommentItem, i: number) => (
                            <div key={i} className={'flex flex-col gap-2 mt-3  '}>
                                <div className="flex gap-2 relative p-4 border-b-2">
                                    <div className={'items-center'}>
                                        <Image src={comment?.user?.image || ""} alt="profile" height={0} width={0} loader={() => comment?.user?.image || ""} className={'h-6 w-6 mt-1 rounded-full'} />
                                    </div>
                                    <div className={'flex flex-col'}>
                                        <div className="flex gap-4">
                                            <p className={'text-gray-600 text-sm font-semibold flex items-center'}>{comment.user?.name}{comment?.user.verified && <span className="mb-1"><Verified /></span>}
                                            </p>
                                            <span
                                                className={'text-gray-600 font-semibold text-xs'}>{commentTimes[comment?._id]}
                                            </span>
                                        </div>
                                        <HighlightUsername text={comment?.desc} username={comment?.replyOnUserName} />
                                    </div>

                                </div>
                                {comment.replies.length > 0 && (
                                    <div>
                                        {comment.replies.map((replyComment, j: number) => (
                                            <div key={j} className="flex border-l-2 flex-col gap-2 ml-10 p-4 ">
                                                <div className="flex gap-2 p-4 relative border-b-2">
                                                    <div className={'items-center'}>
                                                        <Image src={replyComment?.user?.image || ""} alt="profile" height={0} width={0} loader={() => replyComment?.user?.image || ""} className={'h-6 w-6 mt-1 rounded-full'} />
                                                    </div>
                                                    <div className={'flex flex-col'}>
                                                        <div className="flex gap-4">
                                                            <p className={'text-gray-600 text-sm font-semibold flex items-center'}>{replyComment.user?.name}{replyComment?.user.verified && <span className="mb-1"><Verified /></span>}
                                                            </p>
                                                            <span
                                                                className={'text-gray-600 font-semibold text-xs'}>{commentTimes[replyComment?._id]}
                                                            </span>
                                                        </div>
                                                        <HighlightUsername text={replyComment?.desc} username={replyComment?.replyOnUserName} />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}


                            </div>
                        ))
                    ) : <div className="w-full flex justify-center p-4">Belum ada komentar</div>}
                </div>
            </div>}
        </div>
    )
}

export default DetailPost
