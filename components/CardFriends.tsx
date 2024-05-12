import React from 'react'
import {
    Card,
    CardBody,
    CardFooter,
    Divider,
    List,
    ListItem,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { getAllUser } from '@/services/user';
import Image from 'next/image';
<<<<<<< HEAD
import UserListSkeleton from "@/components/UserListSkeleton";
import Link from "next/link";
=======
>>>>>>> origin/main
const CardFriends = () => {

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
        <div className='w-full mt-20 md:mt-0'>
            <div className='ml-0'>
                <div>
                    <div>
                        <h1 className='text-xl font-semibold mb-4 text-white'>Members</h1>
                        <List spacing={3}>
                            {userLoading ? (
<<<<<<< HEAD
                                <ListItem>
                                   <UserListSkeleton number={5}/>
                                </ListItem>
=======
                                <div>
                                    Loading
                                </div>
>>>>>>> origin/main
                            ) : userData?.slice(0, 5).map((data: User, i: number) => (
                                <ListItem key={i}>
                                    <div className='flex gap-2'>
                                        <div className='flex items-center'>
                                            <Image
<<<<<<< HEAD
                                                alt={data?.name}
                                                src={data?.image}
                                                height={10}
                                                loader={() => data?.image}
=======
                                                alt={data.name}
                                                src={data.image}
                                                height={10}
                                                loader={() => data.image}
>>>>>>> origin/main
                                                width={10}
                                                className='w-10 h-10 rounded-full'
                                            />
                                        </div>
                                        <div className='flex flex-col'>
                                            <p className='font-semibold text-white'>
<<<<<<< HEAD
                                                {data?.name.length > 20 ? data.name.substring(0, 20) + '...' : data.name}
                                            </p>
                                            <p className='text-text text-xs'>
                                                {data?.desc?.length > 20 ? data.desc.substring(0, 20) + '...' : data.desc}
=======
                                                {data.name.length > 20 ? data.name.substring(0, 20) + '...' : data.name}
                                            </p>
                                            <p className='text-text text-xs'>
                                                {data.desc?.length > 20 ? data.desc.substring(0, 20) + '...' : data.desc}
>>>>>>> origin/main
                                            </p>
                                        </div>

                                    </div>
                                </ListItem>
                            ))}
                        </List>
                    </div>
                    <div className={'py-4'}>
<<<<<<< HEAD
                        <Link href={"/member-list"}>
                            <p  className='w-full text-center p-2 bg-button  rounded-lg text-white font-semibold'>
                                Show more
                            </p>
                        </Link>
=======
                        <button className='w-full p-2 bg-button  rounded-xl text-white font-semibold'>
                            Show More
                        </button>
>>>>>>> origin/main
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardFriends
