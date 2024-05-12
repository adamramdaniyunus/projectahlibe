import PostBox from "@/components/PostBox";
import { MoonLoader } from 'react-spinners'
import SkeletonPost from "@/components/SkeletonPost";
interface GridProps {
    data: DataItem[];
    loading: boolean;
    refetch: () => void;
    fetchingDataPost: boolean;
}

export const Spinner = () => {
    return (
        <div className="lg:ml-[20%]  flex lg:justify-center justify-start w-screen">
            <MoonLoader color="#756AB6" size={70} className="mt-10 md:mr-80 mr-0 ml-40 md:ml-0" />
        </div>
    )
}


export default function PostGrid({ data, loading, fetchingDataPost, refetch }: GridProps) {
    // went data loading
    if (fetchingDataPost) {
        return <Spinner />
    }

    if(loading) {
        return (
           <SkeletonPost/>
        )
    }

    // if (postUser?.length > 0) {
    //     return (
    //         <div className="flex p-4 md:px-0 px-1 w-full flex-col mb-20 gap-10 justify-center">
    //         {postUser?.length > 0 ? postUser?.map((data: DataItem, i: number) => (
    //                 <PostBox key={i} data={data} refetch={refetch} />
    //             )) : <h1 className="text-xl font-semibold h-32  flex items-center text-gray-600">Belum ada postingan</h1>}
    //         </div>
    //     )
    // }

    return (
        <div className={'flex p-4 md:px-0 px-1 w-full flex-col mb-20 gap-5 justify-center'}>
            {(data?.length > 0 ? (
                data?.map((data: DataItem, i: number) => (
                    <PostBox key={i} data={data} refetch={refetch} />
                ))
            ) : <h1 className="text-xl font-semibold h-32  flex items-center text-white lg:ml-[20%] ml-0  justify-center lg:w-auto px-4 w-full">Belum ada postingan</h1>)}
        </div>
    );
}