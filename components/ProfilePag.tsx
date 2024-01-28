import Header from "@/components/Header";
import PostGrid from "@/components/PostGrid";
import { getAllPost, getAllPostsNoSearch, getPostUser } from "@/services/post";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Verified from "./icon/Verified";
import { useRouter } from "next/router";
import { getUser } from "@/services/user";
import Pencil from "./icon/Pencil";
import ModalProfile from "./modal/ModalProfile";

export default function ProfilePage({ nameTags }: { nameTags: any }) {
    const [search, setSearchPost] = useState('');
    const router = useRouter()
    const { email }: any = router.query
    const [isModal, setShowModal] = useState(false)
    const { data: session } = useSession()


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
        <div className="h-screen">
            <Header showTags={showTags} setShowTags={setShowTags} search={search} setSearchPost={setSearchPost as () => void} refetch={() => { }} refetchDataTwo={refetchDataPostUser} data={[]} />
            <div className={'mt-10 md:mt-20 flex gap-10 justify-center items-center md:items-start relative flex-col md:flex-row h-full overflow-auto md:overflow-hidden'}>
                <div className={`py-4 mt-[27rem] md:mt-0  md:w-1/2 md:flex justify-end h-full md:h-2/3`}>
                    <div className="shadow card">
                        <div className="card__img">
                            <img className="rounded-t-xl" src={userDta?.background || "/images/background.png"} alt="" />
                        </div>
                        <div className="card__avatar">
                            {loadingUserData ? <div className="rounded-full w-[100px] h-[100px] bg-gray-400"></div>
                                :
                                <img src={userDta?.image ?? ""} alt="" />
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