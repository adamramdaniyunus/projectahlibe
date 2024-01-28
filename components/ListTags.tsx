import { getTags } from '@/services/tags';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import React from 'react'
import TagsSkeleton from './TagsSkeleton';


const ListTags = ({ setTags }: { setTags: (e: any) => void }) => {
    const { data: dataTags, isLoading } = useQuery({
        queryFn: () => getTags(),
        queryKey: ["tags"]
    })



    return (
        <div className='w-full md:w-1/3'>
            <h1 className='text-gray-400 text-xs w-full md:text-sm p-1 md:p-4'>Cari Postingan</h1>
            {/* list tags */}
            <div className='flex flex-col items-start'>
                <button onClick={() => setTags('')} className='lowercase p-2 text-md italic cursor-pointer hover:border-b-blue-400 text-gray-500 border-b-2'>#all</button>
                {
                    isLoading ? <TagsSkeleton /> : (dataTags?.map((tags: any, i: number) => (
                        <button onClick={() => setTags(tags.name)} key={i} className='lowercase p-2 text-md italic cursor-pointer hover:border-b-blue-400 text-gray-500 border-b-2'>#{tags.name}</button>
                    )))
                }

            </div>
        </div>
    )
}

export default ListTags
