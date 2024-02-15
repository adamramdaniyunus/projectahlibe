import HomePage from '@/components/HomePage';
import { useRouter } from 'next/router'
import React from 'react'

const TagsPage = () => {

    const router = useRouter();
    const { name }: any = router.query
    return (
        <>
            <HomePage nameTags={name} />
        </>
    )
}

export default TagsPage
