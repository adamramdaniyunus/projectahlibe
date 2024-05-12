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
                                <div>
                                    Loading
                                </div>
                            ) : userData?.slice(0, 5).map((data: User, i: number) => (
                                <ListItem key={i}>
                                    <div className='flex gap-2'>
                                        <div className='flex items-center'>
                                            <Image
                                                alt={data.name}
                                                src={data.image}
                                                height={10}
                                                loader={() => data.image}
                                                width={10}
                                                className='w-10 h-10 rounded-full'
                                            />
                                        </div>
                                        <div className='flex flex-col'>
                                            <p className='font-semibold text-white'>
                                                {data.name.length > 20 ? data.name.substring(0, 20) + '...' : data.name}
                                            </p>
                                            <p className='text-text text-xs'>
                                                {data.desc?.length > 20 ? data.desc.substring(0, 20) + '...' : data.desc}
                                            </p>
                                        </div>

                                    </div>
                                </ListItem>
                            ))}
                        </List>
                    </div>
                    <div className={'py-4'}>
                        <button className='w-full p-2 bg-button  rounded-xl text-white font-semibold'>
                            Show More
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardFriends
