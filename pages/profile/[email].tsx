import ProfilePage from '@/components/ProfilePag'
import { useRouter } from 'next/router'
import React from 'react'

const profile = () => {

    const router = useRouter();
    const { email } = router.query;

    return (
        <div>
            <ProfilePage />
        </div>
    )
}

export default profile
