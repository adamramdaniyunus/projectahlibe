import Header from "@/components/Header";
import PostGrid from "@/components/PostGrid";
import { getAllPostsNoSearch } from "@/services/post";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import ListTags from "./ListTags";
import { getTags } from "@/services/tags";
import { useSession } from "next-auth/react";
import LoadingLogo from "./LoadingLogo";
import BackgroundBlack from "./BackgroundBlack";
import {wrapPointerEventHandler} from "@chakra-ui/utils";
import {Button, ButtonGroup, Card, CardBody, CardFooter, Divider, Heading, Stack, Text, Image} from "@chakra-ui/react";


type MainLayout = {
    refetchDataPost: () => void;
    children: any;

}


export default function MainLayout({  children, refetchDataPost}: MainLayout) {
    const [showTags, setShowTags] = useState(false)
    const { status } = useSession()


    // get data tags
    const { data: dataTags, isLoading: LoadingTags } = useQuery({
        queryFn: () => getTags(),
        queryKey: ["tags"]
    })

    // this for loading logo went data loading and user loading
    if (LoadingTags || status === "loading") {
        return (
            <LoadingLogo />
        )
    }

    return (
        <div className="bg-primary mt-0">
            <div  className={'flex gap-2 mt-4 justify-center relative'}>
                <div className={`${showTags ? "left-0" : "-left-[37rem]"} overflow-auto lg:-left-20 lg:top-3 z-[55] px-2 lg:bg-none h-full lg:h-[98%] lg:z-10 top-0 bg-primary transition-all fixed lg:w-1/3 w-1/2 lg:flex justify-end`}>
                    <ListTags dataTags={dataTags} isLoading={LoadingTags} setShowTags={setShowTags} />
                </div>
                <div className={'flex flex-col w-full'}>
                    <Header id={""}  email={''} setShowNav={setShowTags} refetchDataPost={refetchDataPost} />
                    <div className={'flex relative'}>
                        <div className={'w-full h-full'}>
                            {/* <SkeletonPost /> */}
                            {children}
                        </div>
                    </div>
                </div>

            </div>

            {showTags && <BackgroundBlack handleShowBar={() => setShowTags(false)}/>}
        </div>
    )
}
