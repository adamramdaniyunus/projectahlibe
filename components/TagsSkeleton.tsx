import React from 'react'

const TagsSkeleton = () => {
    return (
        <div className='flex flex-col gap-4'>
            <div className='p-2 cursor-wait w-24 h-4 bg-gray-300'></div>
            <div className='p-2 cursor-wait w-20 h-4 bg-gray-300'></div>
            <div className='p-2 cursor-wait w-28 h-4 bg-gray-300'></div>
            <div className='p-2 cursor-wait w-16 h-4 bg-gray-300'></div>
            <div className='p-2 cursor-wait w-12 h-4 bg-gray-300'></div>
            <div className='p-2 cursor-wait w-16 h-4 bg-gray-300'></div>
        </div>
    )
}

export default TagsSkeleton
