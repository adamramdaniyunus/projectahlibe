import PostBox from "@/components/PostBox";
import SkeletonPost from "./SkeletonPost";
import { useEffect } from "react";

type DataItem = {
    _id: string;
    desc: string;
    tags: string[];
    user: {
        name: string;
        image: string;
        email: string;
    }
    likes: string[];
    video: string;
    comments: string[];
    image: string;
    createdAt: string;
}



export default function PostGrid({ search, data, postDataTwo, loadingDataPostTwo, loadingDataPostUser, postUser, refetch }: { search: string, data: DataItem[], postDataTwo: DataItem[], postUser: DataItem[], isLoading: boolean, loadingDataPostTwo: boolean, loadingDataPostUser: boolean, refetch: () => void }) {

    if (postUser) {
        return (
            <div>
                {loadingDataPostUser ? <SkeletonPost /> : postUser.length > 0 ? postUser?.map((data: DataItem, i: number) => (
                    <PostBox key={i} data={data} refetch={refetch} />
                )) : <h1 className="text-xl font-semibold h-32  flex items-center text-gray-600">Belum ada postingan</h1>}
            </div>
        )
    }

    return (
        <div className={'flex flex-col mb-20'}>
            {loadingDataPostTwo ? <SkeletonPost /> : (
                postDataTwo?.length > 0 ? (
                    search.length > 0 ? (
                        data.map((data: DataItem, i: number) => (
                            <PostBox key={i} data={data} refetch={refetch} />
                        ))
                    ) : postDataTwo?.map((data: DataItem, i: number) => (
                        <PostBox key={i} data={data} refetch={refetch} />
                    ))
                ) : <h1 className="text-xl font-semibold h-32  flex items-center text-gray-600">Belum ada postingan</h1>)
            }
        </div>
    );
}