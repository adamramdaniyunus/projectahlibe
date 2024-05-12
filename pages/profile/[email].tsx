import ProfilePage from '@/components/ProfilePag'
import { useSession } from 'next-auth/react';
import React from 'react'
import { useDispatch } from 'react-redux';
import { userActions } from '../../store/reducers/userReducers';
import LoadingLogo from '@/components/LoadingLogo';
import MainLayout from "@/components/MainLayout";

const ProfileEmail = () => {

    const { data: session, status } = useSession()
    const dispatch = useDispatch();


    if (session) {
        dispatch(userActions.setUserInfo(session));
        localStorage.setItem("userdata", JSON.stringify(session));
    };

    return (
        <MainLayout refetchDataPost={()=>{}}>
            <ProfilePage />
        </MainLayout>
    )
}

export default ProfileEmail
