import Header from "@/components/Header";
import PostGrid from "@/components/PostGrid";
import { getAllPost, getAllPostsNoSearch } from "@/services/post";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import ListTags from "./ListTags";

export default function HomePage({ nameTags = [] }: { nameTags: any }) {
    const [search, setSearchPost] = useState('');

    const {
        data: postsData,
        isLoading,
        refetch
    } = useQuery({
        queryFn: () => getAllPost(search, nameTags),
        queryKey: ["posts"]
    });


    // data 2 for re fetching after user didnt use search input
    const {
        data: postsDataTwo,
        refetch: refetchDataTwo,
        isLoading: loadingDataPostTwo,
    } = useQuery({
        queryFn: () => getAllPostsNoSearch(nameTags),
        queryKey: ["postsnosearch"]
    });

    useEffect(() => {
        // Memanggil refetchDataTwo hanya sekali saat nameTags berubah
        if (nameTags) {
            refetchDataTwo();
        }
    }, [nameTags, refetchDataTwo]);

    const [showTags, setShowTags] = useState(false)


    return (
        <div>
            <Header showTags={showTags} setShowTags={setShowTags} search={search} setSearchPost={setSearchPost as () => void} refetch={refetch} refetchDataTwo={refetchDataTwo} data={postsData} />
            <div className={'mt-20 flex gap-10 justify-center relative h-screen'}>
                <div className={`${showTags ? "left-0" : "-left-96"} top-0 bg-white p-4 z-50 md:z-10 transition-all absolute md:static w-1/4 md:w-1/2 md:flex justify-end h-2/3 overflow-auto`}>
                    <ListTags />
                </div>
                <div className={'overflow-auto w-auto md:w-full h-full'}>
                    {/* <SkeletonPost /> */}
                    <PostGrid data={postsData} search={search} isLoading={isLoading} loadingDataPostTwo={loadingDataPostTwo} refetch={refetch} postDataTwo={postsDataTwo} />
                </div>
            </div>
        </div>
    )
}