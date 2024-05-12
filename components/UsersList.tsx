import {List, ListItem} from "@chakra-ui/react";
import UserListSkeleton from "@/components/UserListSkeleton";
import Image from "next/image";
import React from "react";
import {useQuery} from "@tanstack/react-query";
import {getAllUser} from "@/services/user";

export default function UsersList() {

    const {
        data: userData,
        refetch,
        isFetching,
        isLoading: userLoading,
    } = useQuery({
        queryFn: () => getAllUser(),
        queryKey: ["users"],
        staleTime: 30 * 60 * 1000, //ini akan di refresh ketika sudah 30 menit
    });

    return (
        <div className={'lg:ml-[14%] ml-0 flex justify-center lg:mt-0 mt-10'}>
            <div className={'lg:w-1/2 p-2 flex flex-col gap-4 relative w-full'}>
                <h1 className={'md:text-2xl text-xl py-2 text-white font-bold '}>Members</h1>
                <hr/>

                <List spacing={3}>
                    {userLoading ? (
                        <ListItem>
                            <UserListSkeleton number={12}/>
                        </ListItem>
                    ) : userData?.map((data: UserType, i: number) => (
                        <ListItem key={i}>
                            <div className='flex gap-2'>
                                <div className='flex items-center'>
                                    <Image
                                        alt={data?.name}
                                        src={data?.image}
                                        height={10}
                                        loader={() => data?.image}
                                        width={10}
                                        className='w-10 h-10 rounded-full'
                                    />
                                </div>
                                <div className='flex flex-col'>
                                    <p className='font-semibold text-white'>
                                        {data?.name}
                                    </p>
                                    <p className='text-gray-500 text-xs'>
                                        {data?.desc?.length > 50 ? data.desc.substring(0, 50) + '...' : data.desc}
                                    </p>
                                </div>

                            </div>
                        </ListItem>
                    ))}
                </List>

            </div>
        </div>
    )
}