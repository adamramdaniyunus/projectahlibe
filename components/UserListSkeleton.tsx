import React from "react";

export default function UserListSkeleton({number}:{number:number}) {
    const items = Array.from({ length: number }, (_, index) => index);

    return (
        <>
            {items.map((item) => (
                <div key={item} className='flex gap-2 pb-2'>
                    <div className='flex items-center'>
                        <div className='w-10 h-10 rounded-full bg-gray-600'></div>
                    </div>
                    <div className='flex flex-col gap-3 w-full'>
                        <p className='font-semibold text-white bg-gray-600 w-1/4 h-3'></p>
                        <p className='text-text text-xs w-[60%] h-4 bg-gray-600'></p>
                    </div>
                </div>
            ))}
        </>
    );
}
