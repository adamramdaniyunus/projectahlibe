import Link from 'next/link';
import React, {Dispatch, SetStateAction} from 'react'
import TagsSkeleton from './TagsSkeleton';
import { useQuery } from '@tanstack/react-query';
import { getAllUser } from '@/services/user';
import Image from 'next/image';
import CardFriends from './CardFriends';
import { Card, List } from '@chakra-ui/react';

interface ListTagsProps {
    dataTags: TagsData[]
    isLoading: boolean
    setShowTags:Dispatch<SetStateAction<any>>
}

const ListTags = ({ dataTags, isLoading, setShowTags }: ListTagsProps) => {

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
        <div className='w-full flex flex-col lg:ml-[40%] ml-0'>
            <div className='flex flex-col justify-end'>
                <CardFriends />

                {isLoading ? <TagsSkeleton/> : (
                    <div className={'flex flex-col justify-end'}>
                        <h1 className='text-white text-xs mt-2 w-full md:text-sm p-1 md:p-2'>Filter Posts</h1>
                        <div className={'flex justify-end flex-col'}>
                            <Link onClick={()=>setShowTags(false)} href={"/"}  className='uppercase active:scale-95
                     p-1 px-4 text-md w-full cursor-pointer hover:bg-gray-600 rounded-md text-white flex gap-2 items-center'><span
                                className='font-semibold not-italic text-white text-lg'>#</span>all</Link>
                            {
                                (dataTags?.map((tags: any, i: number) => (
                                    <Link onClick={()=>setShowTags(false)} href={"/tags/" + tags.name} key={i} className='uppercase active:scale-95
                             p-1 px-4 text-md w-full cursor-pointer hover:bg-gray-600 rounded-md text-white flex gap-2 items-center'><span
                                        className='font-semibold not-italic text-white text-lg'>#</span>{tags.name}
                                    </Link>
                                )))
                            }
                        </div>
                    </div>
                )}
            </div>

            <div className='flex flex-wrap gap-2 text-lg mt-10 px-4 text-gray-400'>
                <Link href={'https://instagram.com/adamramdaniyunus'}>Instagram</Link>
                <Link href={'https://wa.me/6289526496026'}>Contact</Link>
            </div>

            <div className={'flex flex-col text-gray-400 px-4 text-lg'}>
                <h1 className={''}>© 2024 AHALIBE</h1>
                <h1 className={''}>All rights reserved</h1>
            </div>
        </div>
    )
}

export default ListTags
