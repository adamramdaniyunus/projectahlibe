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

    const name = "all"

    return (
        <div className='w-full md:w-1/3 h-screen'>
            <h1 className='text-gray-400 text-xs w-full md:text-sm p-1 md:p-4'>Cari Postingan</h1>
            {/* list tags */}
            <div className='flex flex-col items-start'>
                <Link href={"/tags/" + name} className='lowercase p-2 text-md italic cursor-pointer hover:border-b-blue-400 text-gray-500 border-b-2'>#all</Link>
                {
                    isLoading ? <TagsSkeleton /> : (dataTags?.map((tags: any, i: number) => (
                        <Link href={"/tags/" + tags.name} key={i} className='lowercase p-2 text-md italic cursor-pointer hover:border-b-blue-400 text-gray-500 border-b-2'>#{tags.name}</Link>
                    )))
                }

            </div>
        </div>
    )
}

export default ListTags
