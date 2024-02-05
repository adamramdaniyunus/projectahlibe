import { getTags } from '@/services/tags';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import React from 'react'
import TagsSkeleton from './TagsSkeleton';


const ListTags = () => {
    const { data: dataTags, isLoading } = useQuery({
        queryFn: () => getTags(),
        queryKey: ["tags"]
    })

    return (
        <div className='w-full md:w-1/3 h-screen'>
            <h1 className='text-gray-400 text-xs w-full md:text-sm p-1 md:p-4'>Cari Postingan</h1>
            {/* list tags */}
            {
                isLoading ? <TagsSkeleton /> : <div className='flex flex-col items-start'>
                    <Link href={"/"} className='lowercase p-1 px-2 text-md w-full cursor-pointer hover:bg-gray-100 rounded-md text-gray-500 flex gap-2 items-center'><span className='font-semibold not-italic text-gray-700 text-lg'>#</span>all</Link>
                    {
                        (dataTags?.map((tags: any, i: number) => (
                            <Link href={"/tags/" + tags.name} key={i} className='lowercase p-1 px-2 text-md w-full cursor-pointer hover:bg-gray-100 rounded-md text-gray-500 flex gap-2 items-center'><span className='font-semibold not-italic text-gray-700 text-lg'>#</span>{tags.name}</Link>
                        )))
                    }

                </div>
            }
        </div>
    )
}

export default ListTags
