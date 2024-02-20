import Link from 'next/link';
import React from 'react'
import TagsSkeleton from './TagsSkeleton';
interface ListTagsProps {
    dataTags: TagsData[]
    isLoading: boolean
}

const ListTags = ({ dataTags, isLoading }: ListTagsProps) => {

    return (
        <div className='w-full md:w-1/3 h-screen'>
            <h1 className='text-gray-400 text-xs mt-2 w-full md:text-sm p-1 md:p-4'>Cari Postingan</h1>
            {/* list tags */}
            {isLoading ? <TagsSkeleton /> : (
                <div className='flex flex-col items-start mt-4'>
                    <Link href={"/"} className='lowercase active:scale-95
                     p-1 px-2 text-md w-full cursor-pointer hover:bg-gray-200 rounded-md text-gray-500 flex gap-2 items-center'><span className='font-semibold not-italic text-gray-700 text-lg'>#</span>all</Link>
                    {
                        (dataTags?.map((tags: any, i: number) => (
                            <Link href={"/tags/" + tags.name} key={i} className='lowercase active:scale-95
                             p-1 px-2 text-md w-full cursor-pointer hover:bg-gray-200 rounded-md text-gray-500 flex gap-2 items-center'><span className='font-semibold not-italic text-gray-700 text-lg'>#</span>{tags.name}</Link>
                        )))
                    }

                </div>)
            }

            <div className='absolute bottom-0 text-sm text-gray-400'>
                <Link href={'https://instagram.com/adamramdaniyunus'}>@adamramdaniyunus</Link>
            </div>
        </div>
    )
}

export default ListTags
