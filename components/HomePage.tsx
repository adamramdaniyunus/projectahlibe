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
import MainLayout from "@/components/MainLayout";

export default function HomePage({ nameTags }: { nameTags: any }) {
    nameTags?.length ? nameTags : nameTags = "all"

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

    useEffect(() => {
        // Memanggil refetchDataPost hanya sekali saat nameTags berubah
        if (nameTags) {
            refetchDataPost()
            // localStorage.setItem("timesData", new Date().getTime().toString());
        }
    }, [nameTags, refetchDataPost]);

    return (
        <MainLayout
            refetchDataPost={refetchDataPost}
        >
            <PostGrid
                refetch={refetchDataPost}
                fetchingDataPost={fetchingDataPost}
                loading={loadingDataPostTwo}
                data={postsData}
            />
        </MainLayout>
    )
}   