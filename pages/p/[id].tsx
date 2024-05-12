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
import MainLayout from "@/components/MainLayout";
import {AxiosError} from "axios";

const DetailPost = () => {
    const router = useRouter();
    const { id }: any = router.query

    const {
        data: postData,
        refetch: refetchDataPost,
        isFetching: fetchingDataPost,
        isLoading: loadingPost,
        error:queryError,
    } = useQuery({
        queryFn: () => getOnePost(id),
        queryKey: ["detailpost"],
        staleTime: 30 * 60 * 1000, //ini akan di refresh ketika sudah 30 dmnit
        enabled: !!id
    });

    const queryKey = ["comments", postData?._id];
    // ini untuk penanganan error
    const errorStatus = (queryError as AxiosError)?.response?.status;

    const {
        data: postComments,
        refetch: refetchComments,
        isLoading: loadingComments,
    } = useQuery({
        queryFn: () => getAllCommentPost(postData?._id),
        queryKey,
    });

    const commentTimes: { [key: string]: string } = {};
    // mapping times
    postComments?.forEach((comment: CommentItem) => {
        commentTimes[comment._id] = calculateTimeDifference(comment.createdAt);
    });



    if(errorStatus === 404) {
        return (
            <MainLayout refetchDataPost={() => { }}>
                <div className={'lg:ml-[14%] ml-0 flex h-[500px] items-center justify-center lg:mt-0 mt-10'}>
                    <div className={'lg:w-1/2 p-2 flex flex-col gap-4 relative w-full'}>
                        <h1 className={'md:text-2xl text-xl py-2 text-white font-bold '}>Post not found</h1>
                        <hr/>
                    </div>
                </div>
            </MainLayout>
        )
    }


    return (
        <MainLayout refetchDataPost={() => {
        }}>
            {fetchingDataPost ? <div className="h-screen flex justify-center">
                <MoonLoader color="#756AB6" size={70} className="mt-20 md:mr-100 mr-0"/>
            </div> : <div className='mt-4 flex flex-col justify-center'>
                <PostBox data={postData} refetch={() => {
                }}/>
                <div className={''}>
                    {loadingComments ? <div>Loading...</div> : postComments?.length > 0 ? (
                        postComments?.filter((comment: any) => comment.parent === null).map((comment: CommentItem, i: number) => (
                            <div key={i} className={'flex flex-col justify-center lg:ml-[32%] ml-0 gap-2 mt-3'}>
                                <div className="flex gap-2 relative p-4 border-b-2">
                                    <div className={'items-center'}>
                                        <Image src={comment?.user?.image || ""} alt="profile" height={0} width={0} loader={() => comment?.user?.image || ""} className={'h-6 w-6 mt-1 rounded-full'} />
                                    </div>
                                    <div className={'flex flex-col'}>
                                        <div className="flex gap-4">
                                            <p className={'text-gray-500 text-sm font-semibold flex items-center'}>{comment.user?.name}{comment?.user.verified && <span className="mb-1"><Verified /></span>}
                                            </p>
                                            <span
                                                className={'text-gray-500 font-semibold text-xs'}>{commentTimes[comment?._id]}
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
        </MainLayout>
    )
}

export default DetailPost
