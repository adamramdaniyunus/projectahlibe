import Link from "next/link";
import ProfileIcon from "@/components/icon/Profile";
import PostIcons from "@/components/icon/PostIcons";
import { useState, useEffect, useRef, MouseEvent, SetStateAction } from "react";
import Modal from "@/components/modal/Modal";
import { signIn, useSession } from "next-auth/react";
import MenuIcon from "./icon/MenuIcon";
import { useSelector } from "react-redux";
import Image from "next/image";
import HomeIcon from "@/components/icon/HomeIcon";
import {useRouter} from "next/router";
import {Input} from "@chakra-ui/react";
import SearchIcon from "@/components/icon/SearchIcon";

type Header = {
    refetchDataPost: () => void;
    setShowNav: (e: any) => void;
    email: any;
    id: any;
}

export default function Header({ setShowNav, refetchDataPost, email, id }: Header) {
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
        setShowNav((prev: any) => !prev)
        // setShowTags(true)
    }


    // handle show report bar
    const handleShowReport = () => {
        setShowNav((prev: any) => !prev)
    }

    const router = useRouter();
    const isActiveLink = (path:any) => {
        return path === router.pathname;
    };


    return (
        <div ref={headerRef} className={`z-50 flex items-center w-ful fixed top-2 right-2 shadow`}>
            <div className={`flex items-center justify-end w-full`}>
                <nav className={`gap-x-10 relative flex items-center justify-center font-semibold bg-button2 rounded-lg p-4`}>
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
                    <Link href={'/'}><HomeIcon color={isActiveLink('/' || '/tags')}/></Link>
                    {user ? <Link href={'/post'}><PostIcons color={isActiveLink('/post')}/></Link> : (
                        <button onClick={() => signIn('google')}><PostIcons color={false} /></button>
                    )}
                    {/* {showSearch && <input value={search} onChange={handleSearch} className={"absolute input w-[300px] left-1 -bottom-16"} placeholder={"Cari postingan"} />} */}
                    {user ? <Link href={`/profile/${user.email}`}>
                        <Image
                            src={user.image||""}
                            alt={user.name||""}
                            width={0} height={0}
                            loader={() => user.image || ""}
                            className={"w-8 h-8 rounded-full"}
                        />
                    </Link> : (
                        <button onClick={() => signIn('google')} className={'font-bold uppercase text-white'}>ahalibe
                    </button>
                        )}
                </nav>
            </div>

            {isModal && <Modal isModal={isModal} handleModal={handleClickModal} refetchDataPost={refetchDataPost} />}

        </div>
    )
}