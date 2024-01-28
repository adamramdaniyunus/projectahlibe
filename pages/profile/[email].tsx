import ProfilePage from '@/components/ProfilePag'
import { useSession } from 'next-auth/react';
import React from 'react'
import { useDispatch } from 'react-redux';
import { userActions } from '../../store/reducers/userReducers';

const ProfileEmail = () => {

    const { data: session } = useSession()
    const dispatch = useDispatch();

    if (session) {
        dispatch(userActions.setUserInfo(session));
        localStorage.setItem("userdata", JSON.stringify(session));
    };

    return (
        <div className="h-screen">
            <ProfilePage nameTags={""} />
        </div>
    )
}

export default ProfileEmail
