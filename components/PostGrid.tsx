import PostBox from "@/components/PostBox";
import { MoonLoader } from 'react-spinners'

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
    loading: boolean
}

export const Spinner = () => {
    return (
        <div className="h-screen flex justify-center">
            <MoonLoader color="#36d7b7" size={70} className="mt-10 md:mr-80 mr-0" />
        </div>
    )
}


export default function PostGrid({ search, data, postDataTwo, loading, fetchingDataUser, loadingDataPostTwo, loadingDataPostUser, isLoading, postUser, fetchingDataTwo, refetch }: GridProps) {
    // went data loading
    if (loading) {
        return <Spinner />
    }

    if (postUser?.length > 0) {
        return (
            <div>
                {loadingDataPostUser ? <Spinner /> : postUser?.length > 0 ? postUser?.map((data: DataItem, i: number) => (
                    <PostBox key={i} data={data} refetch={refetch} />
                )) : <h1 className="text-xl font-semibold h-32  flex items-center text-gray-600">Belum ada postingan</h1>}
            </div>
        )
    }



    if (search?.length > 0) {
        return (
            <div>
                {isLoading ? <Spinner /> : data?.length > 0 ? data?.map((data: DataItem, i: number) => (
                    <PostBox key={i} data={data} refetch={refetch} />
                )) : <h1 className="text-xl font-semibold h-32  flex items-center text-gray-600">Belum ada postingan</h1>}
            </div>
        )
    }


    return (
        <div className={'flex flex-col mb-20'}>
            {(loadingDataPostTwo ? <Spinner /> : postDataTwo?.length > 0 ? (
                postDataTwo?.map((data: DataItem, i: number) => (
                    <PostBox key={i} data={data} refetch={refetch} />
                ))
            ) : <h1 className="text-xl font-semibold h-32  flex items-center text-gray-600">Belum ada postingan</h1>)}
        </div>
    );
}