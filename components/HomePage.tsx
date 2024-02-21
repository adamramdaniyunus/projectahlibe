import Header from "@/components/Header";
import PostGrid from "@/components/PostGrid";
import { getAllPostsNoSearch } from "@/services/post";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import ListTags from "./ListTags";
import { getTags } from "@/services/tags";
import { useSession } from "next-auth/react";
import LoadingLogo from "./LoadingLogo";
import BackgroundBlack from "./BackgroundBlack";

export default function HomePage({ nameTags }: { nameTags: any }) {
    const { status } = useSession()
    nameTags?.length ? nameTags : nameTags = "all"
    const [showTags, setShowTags] = useState(false)
    // data 2 for re fetching after user didnt use search input
    const {
        data: postsData,
        refetch: refetchDataPost,
        isFetching: fetchingDataPost,
        isLoading: loadingDataPostTwo,
    } = useQuery({
        queryFn: () => getAllPostsNoSearch(nameTags),
        queryKey: ["post"],
        staleTime: 30 * 60 * 1000, //ini akan di refresh ketika sudah 30 menit
    });

    // get data tags
    const { data: dataTags, isLoading: LoadingTags } = useQuery({
        queryFn: () => getTags(),
        queryKey: ["tags"]
    })


    useEffect(() => {
        // Memanggil refetchDataPost hanya sekali saat nameTags berubah
        if (nameTags) {
            refetchDataPost()
            // localStorage.setItem("timesData", new Date().getTime().toString());
        }
    }, [nameTags, refetchDataPost]);

    // this for loading logo went data loading and user loading
    if (loadingDataPostTwo && LoadingTags || status === "loading") {
        return (
            <LoadingLogo />
        )
    }

    return (
        <div>
            <Header id={""} setShowReport={() => { }} email={''} setShowTags={setShowTags} refetchDataPost={refetchDataPost} />
            <div onClick={() => setShowTags(false)} className={'flex gap-10 mt-20 justify-center relative h-screen'}>
                <div className={`${showTags ? "left-0" : "-left-[37rem]"} top-0 z-[55] px-2 bg-white lg:bg-none p-4 h-screen lg:z-10 transition-all fixed lg:static w-1/2 lg:w-1/2 lg:flex justify-end lg:h-2/3 lg:overflow-hidden overflow-auto`}>
                    <ListTags dataTags={dataTags} isLoading={LoadingTags} />
                </div>
                <div className={'overflow-auto w-auto lg:w-full h-full'}>
                    {/* <SkeletonPost /> */}
                    <PostGrid refetch={refetchDataPost} fetchingDataPost={fetchingDataPost} loadingDataPostUser={false} postUser={[]} loadingDataPostTwo={loadingDataPostTwo} postData={postsData} />
                </div>
            </div>

            {showTags && <BackgroundBlack handleShowBar={() => setShowTags(false)} />}
        </div>
    )
}   