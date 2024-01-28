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

export default function ProfilePage({ nameTags }: { nameTags: any }) {
    const [search, setSearchPost] = useState('');
    const router = useRouter()
    const { email }: any = router.query
    const [isModal, setShowModal] = useState(false)
    const { data: session } = useSession()
    const background = "https://utfs.io/f/59381309-e7e4-439f-81ed-f2a170446a56-m15jgy.png"


    // get data user
    const {
        data: userDta,
        isLoading: loadingUserData,
        refetch: refetchUserData
    } = useQuery({
        queryFn: () => getUser(email),
        queryKey: ["profile"]
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



    const [showTags, setShowTags] = useState(false)
    return (
        <div>
            <Header showTags={showTags} setShowTags={setShowTags} search={search} setSearchPost={setSearchPost as () => void} refetch={() => { }} refetchDataTwo={refetchDataPostUser} data={[]} />
            <div className={'flex md:gap-10 gap-2 mt-20 h-full md:h-screen justify-center items-center md:items-start relative flex-col md:flex-row overflow-auto md:overflow-hidden'}>
                <div className={`py-4 md:mt-0 md:w-1/2 md:flex justify-end h-full md:h-2/3`}>
                    <div className="shadow card">
                        <div className="card__img">
                            <Image className="rounded-t-xl" loader={() => background} src={background} height={500} width={500} alt="background" />
                        </div>
                        <div className="card__avatar">
                            {loadingUserData ? <div className="rounded-full w-[100px] h-[100px] bg-gray-400"></div>
                                :
                                <Image loader={() => userDta?.image} src={userDta?.image ?? ""} alt="profile" height={0} width={0} />
                            }
                        </div>
                        <div className="card__title w-full flex justify-center">
                            {loadingUserData ? <div className="w-[200px] bg-gray-200 h-4"></div> :
                                <div className="w-full flex justify-center">
                                    {userDta?.email}
                                    {userDta?.email === session?.user?.email && <button className="absolute right-0 bottom-0" onClick={handleEditButton}>
                                        <Pencil />
                                    </button>}
                                </div>
                            }
                        </div>
                        <div className="card__subtitle flex relative">
                            {loadingUserData ? <div className="w-[100px] bg-gray-200 h-4"></div> :
                                <div className="relative w-full flex">
                                    <input type="text" className="outline-none w-full text-center" value={userDta?.name} readOnly={true} />
                                    {/* <button className="absolute right-0" onClick={handleEditButton}><Pencil /></button> */}
                                </div>}{userDta?.verified && <span className="absolute right-3"><Verified /></span>}</div>
                        <div className="p-4 flex items-center justify-center">
                            <p className="text-gray-600 text-[13px]">{userDta?.desc}</p>
                        </div>
                        {userDta?.email === session?.user?.email && <div>
                            <button className="card__btn" onClick={() => signOut()}>Logout</button>
                        </div>}

                    </div>
                </div>

                {isModal && <ModalProfile handleModal={handleEditButton} refetchUser={refetchUserData} userDta={userDta} />}
                <div className={'w-auto md:w-full h-full md:overflow-auto mb-20'}>
                    {/* <SkeletonPost /> */}
                    <PostGrid data={[]} search={search} fetchingDataUser={fetchingDataUser} fetchingDataTwo={false} isLoading={false} loadingDataPostTwo={loadingDataPostUser} loadingDataPostUser={loadingDataPostUser} refetch={refetchDataPostUser} postUser={postUser} postDataTwo={[]} />
                </div>
            </div>
        </div>
    )
}