import Header from "@/components/Header";
import PostGrid from "@/components/PostGrid";
import { getAllPost, getAllPostsNoSearch, getPostUser } from "@/services/post";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Verified from "./icon/Verified";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { getUser } from "@/services/user";
import Pencil from "./icon/Pencil";
import ModalProfile from "./modal/ModalProfile";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/actions/useraction";
import toast from "react-hot-toast";

export default function ProfilePage() {
    const router = useRouter()
    const { email }: any = router.query
    const [isModal, setShowModal] = useState(false)
    const { userInfo } = useSelector((state: any) => state.user)
    const background = "https://utfs.io/f/59381309-e7e4-439f-81ed-f2a170446a56-m15jgy.png"
    const [showTags, setShowTags] = useState(false)
    const dispatch: any = useDispatch()

    // get data user
    const {
        data: userDta,
        isLoading: loadingUserData,
        refetch: refetchUserData
    } = useQuery({
        queryFn: () => getUser(email),
        queryKey: ["profile", email]
    });


    if (email) {
        refetchUserData()
    }


    // handle edit button
    const handleEditButton = () => {
        setShowModal(prev => !prev)
    }

    // data 2 for re fetching after user didnt use search input
    const {
        data: postUser,
        refetch: refetchDataPostUser,
        isFetching: fetchingDataUser,
        isLoading: loadingDataPostUser,
    } = useQuery({
        queryFn: () => getPostUser(email),
        queryKey: ["postuser", email]
    });

    // logout function
    const handleLogout = async () => {
        dispatch(logout())
        await signOut()
    }
    return (
        <>
            <Header showTags={showTags} setShowTags={setShowTags} refetchDataTwo={refetchDataPostUser} />
            <div className={'flex md:gap-10 gap-2 mt-20 h-full md:h-screen justify-center items-center md:items-start relative flex-col md:flex-row overflow-auto md:overflow-hidden'}>
                <div className={`py-4 md:mt-0 md:w-1/2 md:flex justify-end h-full md:h-2/3`}>
                    <div className="shadow card">
                        <div className="card__img">
                            <Image className="rounded-t-xl" src={background} height={500} width={500} alt="background" />
                        </div>
                        <div className="card__avatar">
                            {loadingUserData ? <div className="rounded-full w-[100px] h-[100px] bg-gray-400"></div>
                                :
                                <Image loader={() => userDta?.image} src={userDta?.image || ""} alt="profile" height={0} width={0} />
                            }
                        </div>

                        {loadingUserData ? <div className="w-[200px] bg-gray-200 h-4"></div> :
                            userDta?.email === userInfo?.user.email && <button className="absolute right-2 bottom-2" onClick={handleEditButton}>
                                <Pencil />
                            </button>
                        }
                        <div className="flex relative">
                            {loadingUserData ? <div className="w-[100px] bg-gray-200 h-4"></div> :
                                <div className="relative w-full font-semibold flex">
                                    {userDta?.name}{userDta?.verified && <span className="absolute -right-4"><Verified /></span>}
                                </div>}
                        </div>
                        <div className="p-4 flex items-center justify-center">
                            <p className="text-gray-600 text-[13px] max-w-[280px]">{userDta?.desc}</p>
                        </div>
                        {userDta?.email === userInfo?.user.email && <div className="mt-2">
                            <button type="button" className="card__btn mb-2" onClick={handleLogout}>Logout</button>
                        </div>}

                    </div>
                </div>

                {isModal && <ModalProfile handleModal={handleEditButton} refetchUser={refetchUserData} userDta={userDta} />}
                <div className={'w-auto md:w-full h-full md:overflow-auto mb-20'}>
                    {/* <SkeletonPost /> */}
                    <PostGrid fetchingDataUser={fetchingDataUser} fetchingDataTwo={false} loadingDataPostTwo={loadingDataPostUser} loadingDataPostUser={loadingDataPostUser} refetch={refetchDataPostUser} postUser={postUser} postDataTwo={[]} />
                </div>
            </div>
        </>
    )
}