import Header from "@/components/Header";
import PostGrid, { Spinner } from "@/components/PostGrid";
import { getPostUser } from "@/services/post";
import { useQuery } from "@tanstack/react-query";
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
import Link from "next/link";
import BackgroundBlack from "./BackgroundBlack";
import { getReport } from "@/services/report";

export default function ProfilePage() {
    const router = useRouter()
    const { email }: any = router.query
    const [isModal, setShowModal] = useState(false)
    const { userInfo } = useSelector((state: any) => state.user)
    const dispatch: any = useDispatch()
    const [showReport, setShowReport] = useState(false)
    // get data user
    const {
        data: userDta,
        isLoading: loadingDataUser,
        isFetching: fetchingUser,
        refetch: refetchUserData
    } = useQuery({
        queryFn: () => getUser(email),
        queryKey: ["profile", email],
        staleTime: 30 * 60 * 1000
    });

    // get data report
    const {
        data: reportData,
        isLoading: reportLoading,
        isFetching: reportFetching,
        refetch: refetchReport,
    } = useQuery({
        queryFn: () => getReport(),
        queryKey: ["report"],
        staleTime: 30 * 60 * 1000
    })

    // handle edit button
    const handleEditButton = () => {
        setShowModal(prev => !prev)
    }

    useEffect(() => {
        refetchReport()
    }, [refetchReport])

    // data 2 for re fetching after user didnt use search input
    const {
        data: postUser,
        refetch: refetchDataPostUser,
        isFetching: fetchingDataUser,
        isLoading: loadingDataPostUser,
    } = useQuery({
        queryFn: () => getPostUser(email),
        queryKey: ["postuser", email],
        staleTime: 30 * 60 * 1000
    });

    // logout function
    const handleLogout = async () => {
        dispatch(logout())
        await signOut()
    }
    return (
        <div className={''}>
            <div className={'flex md:gap-10 gap-2 mt-40 lg:mt-20 w-full md:px-4 h-full justify-center items-center relative flex-col'}>
                <div className={`py-4 md:mt-0 w-full lg:w-[37%] relative md:flex justify-center lg:ml-[13%] ml-0`}>
                    <div className="border-b-2 w-full">
                        <div className="card__avatar w-full">
                            {loadingDataUser ? <div className="rounded-full w-[100px] h-[100px] bg-gray-600"></div>
                                :
                                <Image loader={() => userDta?.image} src={userDta?.image || ""} alt="profile" height={0} width={0} />
                            }
                        </div>

                        {userDta?.email === userInfo?.user.email && <Link href={`/edit-profile/${userDta?.email}`} className="absolute right-0 bottom-10" >
                                <Pencil />
                            </Link>
                        }
                        <div className="flex relative">
                            {loadingDataUser ? <div className="w-full justify-center font-semibold flex">
                                    <div className={"bg-gray-600 h-4 w-40"}>
                                    </div>
                                </div> :
                                <div className="w-full justify-center font-semibold flex">
                                    <h1 className={"relative text-white"}>
                                        {userDta?.name}{userDta?.verified &&
                                        <span className="absolute -right-4"><Verified/></span>}
                                    </h1>
                                </div>}
                        </div>
                        <div className="p-4 flex items-center justify-center">
                            <p className="text-gray-500 text-sm max-w-[480px]">{userDta?.desc}</p>
                        </div>
                        {userDta?.email === userInfo?.user.email && <div className="mt-2">
                            <button type="button" className="card__btn mb-2" onClick={handleLogout}>Logout</button>
                        </div>}

                    </div>
                </div>

                {isModal && <ModalProfile isModal={isModal} handleModal={handleEditButton} refetchUser={refetchUserData} userDta={userDta} />}
                <div className={'w-auto md:w-full h-full'}>
                    {/* <SkeletonPost /> */}
                    <PostGrid fetchingDataPost={fetchingDataUser} loading={loadingDataPostUser}  refetch={refetchDataPostUser} data={postUser} />
                </div>

                {showReport && <BackgroundBlack handleShowBar={() => setShowReport(false)} />}
            </div>
        </div>
    )
}