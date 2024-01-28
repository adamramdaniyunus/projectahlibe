import PostBox from "@/components/PostBox";
import SkeletonPost from "./SkeletonPost";

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

interface GridProps {
    isLoading: boolean;
    search: string;
    postDataTwo: DataItem[];
    loadingDataPostTwo: boolean;
    postUser: DataItem[];
    refetch: () => void;
    loadingDataPostUser: boolean;
    data: DataItem[];
    fetchingDataTwo: boolean;
    fetchingDataUser: boolean;
}



export default function PostGrid({ search, data, postDataTwo, fetchingDataUser, loadingDataPostTwo, loadingDataPostUser, isLoading, postUser, fetchingDataTwo, refetch }: GridProps) {
    if (postUser?.length > 0) {
        return (
            <div>
                {loadingDataPostUser ? <SkeletonPost /> : postUser?.length > 0 ? postUser?.map((data: DataItem, i: number) => (
                    <PostBox key={i} data={data} refetch={refetch} />
                )) : <h1 className="text-xl font-semibold h-32  flex items-center text-gray-600">Belum ada postingan</h1>}
            </div>
        )
    }

    if (search?.length > 0) {
        return (
            <div>
                {isLoading ? <SkeletonPost /> : data?.length > 0 ? data?.map((data: DataItem, i: number) => (
                    <PostBox key={i} data={data} refetch={refetch} />
                )) : <h1 className="text-xl font-semibold h-32  flex items-center text-gray-600">Belum ada postingan</h1>}
            </div>
        )
    }

    return (
        <div className={'flex flex-col mb-20'}>
            {loadingDataPostTwo ? <SkeletonPost /> : (
                postDataTwo?.length > 0 ? (
                    postDataTwo?.map((data: DataItem, i: number) => (
                        <PostBox key={i} data={data} refetch={refetch} />
                    ))
                ) : <h1 className="text-xl font-semibold h-32  flex items-center text-gray-600">Belum ada postingan</h1>)
            }
        </div>
    );
}