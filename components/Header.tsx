import Link from "next/link";
import ProfileIcon from "@/components/icon/Profile";
import PostIcons from "@/components/icon/PostIcons";
import { useState, useEffect, useRef, MouseEvent, SetStateAction } from "react";
import Modal from "@/components/modal/Modal";
import { signIn, useSession } from "next-auth/react";
import MenuIcon from "./icon/MenuIcon";
import { useSelector } from "react-redux";

type Header = {
    refetchDataPost: () => void;
    setShowTags: (e: any) => void;
    setShowReport: (e: any) => void;
    email: any;
    id: any;
}

export default function Header({ setShowTags, refetchDataPost, email, setShowReport, id }: Header) {
    const { userInfo } = useSelector((state: any) => state.user)
    const { data: session } = useSession();
    const user = session?.user
    const admin = "adamramdani1122@gmail.com"

    // state
    const headerRef = useRef(null);
    const [isModal, setIsModal] = useState(false)

    const handleClickModal = () => {
        setIsModal(prev => !prev)
    }


    // handle show bar tags
    const handleShowTags = () => {
        setShowTags((prev: any) => !prev)
    }


    // handle show report bar
    const handleShowReport = () => {
        setShowReport((prev: any) => !prev)
    }

    return (
        <div ref={headerRef} className={`bg-primary z-50 fixed top-0 flex items-center left-0 w-full`}>
            <div className={`flex items-center justify-around w-full p-4`}>
                <nav className={`gap-x-4 relative flex items-center justify-center font-semibold`}>
                    {!email && !id && <button onClick={handleShowTags} className="lg:hidden block">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                        </svg>
                    </button>}
                    {id && <Link href={"/"} className="block">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                        </svg>
                    </Link>}
                    {email && email === admin && userInfo?.user.email === admin && (<button onClick={handleShowReport} className="lg:hidden block">
                        <MenuIcon className="w-6 h-6" />
                    </button>)}
                    {/* <button onClick={handleClickShow}><SearchIcon /></button> */}
                    {user ? <button onClick={handleClickModal}><PostIcons color="#FFFFDD" /></button> : (
                        <button onClick={() => signIn('google')}><PostIcons color="#FFFFDD" /></button>
                    )}
                    {user ? <Link href={`/profile/` + user?.email}><ProfileIcon color="#FFFFDD" /></Link> : (
                        <button onClick={() => signIn('google')}><ProfileIcon color="#FFFFDD" /></button>
                    )}
                    {/* {showSearch && <input value={search} onChange={handleSearch} className={"absolute input w-[300px] left-1 -bottom-16"} placeholder={"Cari postingan"} />} */}

                </nav>
                <Link href="/" className={'font-bold uppercase text-white'}>ahalibe
                </Link>
            </div>

            {isModal && <Modal isModal={isModal} handleModal={handleClickModal} refetchDataPost={refetchDataPost} />}

        </div>
    )
}