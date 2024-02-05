import Header from "@/components/Header";
import PostGrid from "@/components/PostGrid";
import { getAllPost, getAllPostsNoSearch } from "@/services/post";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import ListTags from "./ListTags";

export default function HomePage({ nameTags }: { nameTags: any }) {
    const [search, setSearchPost] = useState('');
    nameTags?.length ? nameTags : nameTags = "all"
    // // stale time ini untuk menentukan berapa lama data akan valid
    // const STALE_TIME = 30 * 60 * 1000 // 30 menit lamanya

    // // memeriksa waktu terakhir app dibuka
    // const lastUpdateTime: any = localStorage.getItem('timesData');

    // // perhitungan waktu
    // const currentTime = new Date().getTime();
    // const timeElapsed = currentTime - parseInt(lastUpdateTime, 10);
    // let staleTime = STALE_TIME

    // // atur ulang waktu
    // if (lastUpdateTime) {
    //     staleTime = timeElapsed > STALE_TIME ? STALE_TIME : STALE_TIME - timeElapsed;
    // }
    const {
        data: postsData,
        isLoading,
        refetch
    } = useQuery({
        queryFn: () => getAllPost(search, nameTags),
        queryKey: ["posts"],
        staleTime: 30 * 60 * 1000
    });

    // data 2 for re fetching after user didnt use search input
    const {
        data: postsDataTwo,
        refetch: refetchDataTwo,
        isFetching: fetchingDataTwo,
        isLoading: loadingDataPostTwo,
    } = useQuery({
        queryFn: () => getAllPostsNoSearch(nameTags),
        queryKey: ["postsnosearch"],
        staleTime: 30 * 60 * 1000, //ini akan di refresh ketika sudah 30 menit
    });

    useEffect(() => {
        // Memanggil refetchDataTwo hanya sekali saat nameTags berubah
        if (nameTags) {
            refetchDataTwo()
            // localStorage.setItem("timesData", new Date().getTime().toString());
        }
    }, [nameTags, refetchDataTwo]);

    const [showTags, setShowTags] = useState(false)
    return (
        <div>
            <Header showTags={showTags} setShowTags={setShowTags} search={search} setSearchPost={setSearchPost as () => void} refetch={refetch} refetchDataTwo={refetchDataTwo} data={postsData} />
            <div className={'flex gap-10 mt-20 justify-center relative h-screen'}>
                <div className={`${showTags ? "left-0" : "-left-96"} top-0 bg-white p-4 h-screen z-50 md:z-10 transition-all absolute md:static w-1/4 md:w-1/2 md:flex justify-end md:h-2/3 md:overflow-hidden overflow-auto`}>
                    <ListTags />
                </div>
                <div className={'overflow-auto w-auto md:w-full h-full'}>
                    {/* <SkeletonPost /> */}
                    <PostGrid nameTags={nameTags} data={postsData} fetchingDataUser={false} fetchingDataTwo={fetchingDataTwo} search={search} isLoading={isLoading} loadingDataPostUser={false} postUser={[]} loadingDataPostTwo={loadingDataPostTwo} refetch={refetch} postDataTwo={postsDataTwo} />
                </div>
            </div>
        </div>
    )
}   