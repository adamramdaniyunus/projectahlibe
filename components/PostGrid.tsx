import PostBox from "@/components/PostBox";
import { MoonLoader } from 'react-spinners'
interface GridProps {
    postData: DataItem[];
    loadingDataPostTwo: boolean;
    postUser: DataItem[];
    refetch: () => void;
    loadingDataPostUser: boolean;
    fetchingDataPost: boolean;
}

export const Spinner = () => {
    return (
        <div className="h-screen flex justify-center">
            <MoonLoader color="#756AB6" size={70} className="mt-10 md:mr-80 mr-0" />
        </div>
    )
}


export default function PostGrid({ postData, loadingDataPostTwo, loadingDataPostUser, postUser, fetchingDataPost, refetch }: GridProps) {
    // went data loading
    if (fetchingDataPost) {
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

    return (
        <div className={'flex p-4 md:px-6 px-1 gap-2 w-full flex-col md:mb-20 mb-20'}>
            {(postData?.length > 0 ? (
                postData?.map((data: DataItem, i: number) => (
                    <PostBox key={i} data={data} refetch={refetch} />
                ))
            ) : <h1 className="text-xl font-semibold h-32  flex items-center text-gray-600">Belum ada postingan</h1>)}
        </div>
    );
}