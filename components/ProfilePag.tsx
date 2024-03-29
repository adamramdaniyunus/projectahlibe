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
    const background = "https://utfs.io/f/59381309-e7e4-439f-81ed-f2a170446a56-m15jgy.png"
    const dispatch: any = useDispatch()
    const admin = "adamramdani1122@gmail.com"
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
        <>
            <Header id={""} setShowReport={setShowReport} email={email} setShowTags={() => { }} refetchDataPost={refetchDataPostUser} />
            <div className={'flex md:gap-10 gap-2 mt-20 md:px-4 h-full md:h-screen justify-center items-center md:items-start relative flex-col md:flex-row overflow-auto md:overflow-hidden'}>
                <div className={`py-4 md:mt-0 md:w-1/2 md:flex justify-end h-full md:h-auto`}>
                    <div className="shadow card">
                        <div className="card__img">
                            <Image className="rounded-t-xl" src={background} height={500} width={500} alt="background" />
                        </div>
                        <div className="card__avatar">
                            {loadingDataUser ? <div className="rounded-full w-[100px] h-[100px] bg-gray-400"></div>
                                :
                                <Image loader={() => userDta?.image} src={userDta?.image || ""} alt="profile" height={0} width={0} />
                            }
                        </div>

                        {loadingDataUser ? <div className="w-[200px] bg-gray-200 h-4"></div> :
                            userDta?.email === userInfo?.user.email && <button className="absolute right-2 bottom-2" onClick={handleEditButton}>
                                <Pencil />
                            </button>
                        }
                        <div className="flex relative">
                            {loadingDataUser ? <div className="w-[100px] bg-gray-200 h-4"></div> :
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

                {isModal && <ModalProfile isModal={isModal} handleModal={handleEditButton} refetchUser={refetchUserData} userDta={userDta} />}
                <div className={'w-auto md:w-full h-full md:overflow-auto'}>
                    {/* <SkeletonPost /> */}
                    <PostGrid fetchingDataPost={fetchingDataUser} loadingDataPostTwo={loadingDataPostUser} loadingDataPostUser={loadingDataPostUser} refetch={refetchDataPostUser} postUser={postUser} postData={[]} />
                </div>

                {userDta?.email === admin && userInfo?.user.email === admin && (
                    <div className={`${showReport ? "left-0" : "-left-[37rem]"} h-screen overflow-auto top-0 z-[55] px-2 lg:bg-none p-4 lg:z-10 transition-all fixed lg:static w-1/2 lg:w-full lg:flex flex-col justify-end bg-white`}>
                        <div className="flex items-center py-5 px-4 border-b-2">
                            <h1 className="text-gray-400 text-2xl">Laporan</h1>
                        </div>

                        <div className="flex flex-col gap-2 h-full p-0 md:p-4 mb-10 md:overflow-auto">
                            {reportLoading ? <Spinner /> : reportData?.length > 0 ?
                                reportData?.map((report: ReportData, i: number) => (
                                    <Link href={`/p/${report?.post._id}`} key={i} className="flex gap-2 p-4 relative">
                                        <div className={'items-center'}>
                                            <Image src={report?.user.image} alt="profile" height={0} width={0} className={'h-6 w-6 mt-1 rounded-full'} />
                                        </div>
                                        <div className={'flex flex-col'}>
                                            <div className="flex gap-4">
                                                <p className={'text-gray-600 text-xs md:text-sm font-semibold flex items-center'}>
                                                    {report?.user.name}
                                                </p>
                                            </div>
                                            <div className={'text-gray-500 md:text-sm text-xs'}>
                                                {report?.desc}
                                            </div>
                                        </div>
                                    </Link>
                                ))
                                : <div>
                                    <h1 className="text-lg font-semibold text-gray-500">
                                        Belum ada laporan
                                    </h1>
                                </div>}
                        </div>
                    </div>
                )}

                {showReport && <BackgroundBlack handleShowBar={() => setShowReport(false)} />}
            </div>
        </>
    )
}