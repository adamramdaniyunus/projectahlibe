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



export default function PostGrid({ search, data, postDataTwo, isLoading, loadingDataPostTwo, refetch }: { search: string, data: DataItem[], postDataTwo: DataItem[], isLoading: boolean, loadingDataPostTwo: boolean, refetch: () => void }) {

    return (
        <div className={'flex flex-col mb-20'}>
            {loadingDataPostTwo ? <SkeletonPost /> : (
                data?.length > 0 ? (
                    search.length > 0 ? (
                        data.map((data: DataItem, i: number) => (
                            <PostBox key={i} data={data} refetch={refetch} />
                        ))
                    ) : postDataTwo.length > 0 ? loadingDataPostTwo ? <SkeletonPost /> : postDataTwo?.map((data: DataItem, i: number) => (
                        <PostBox key={i} data={data} refetch={refetch} />
                    )) : <h1 className="text-xl font-semibold h-32  flex items-center text-gray-600">Belum ada postingan</h1>
                ) : <h1 className="text-xl font-semibold h-32  flex items-center text-gray-600">Postingan tidak ditemukan</h1>)
            }
        </div>
    );
}