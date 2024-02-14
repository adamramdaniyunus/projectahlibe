import Link from "next/link";
import ProfileIcon from "@/components/icon/Profile";
import PostIcons from "@/components/icon/PostIcons";
import SearchIcon from "@/components/icon/SearchIcon";
import { useState, useEffect, useRef, MouseEvent, SetStateAction } from "react";
import Modal from "@/components/modal/Modal";
import { signIn, useSession } from "next-auth/react";

type Search = {
    refetchDataTwo: () => void;
    showTags: boolean;
    setShowTags: (e: any) => void;
}
type DataItem = {
    _id: string;
    desc: string;
    tags: string[];
    user: string
    likes: string[];
    comments: string[];
    video: string
    image: string;
    createdAt: string
}



export default function Header({ setShowTags, refetchDataTwo, }: Search) {

    const { data: session } = useSession();
    const user = session?.user

    // state
    const [showSearch, setShowSearch] = useState(false)
    const headerRef = useRef(null);
    const [isModal, setIsModal] = useState(false)

    const handleClickShow = () => {
        setShowSearch(prev => !prev)
    }

    const handleClickModal = () => {
        setIsModal(prev => !prev)
    }


    // handle show bar tags
    const handleShowTags = () => {
        setShowTags((prev: any) => !prev)
    }


    const handleClickOutside = (event: MouseEvent<Document>) => {

        if (headerRef.current) {
            const target = event.target as HTMLElement;
            // Cek apakah yang diklik adalah input atau div yang menunjukkan elemen
            if (
                target.tagName &&
                !target.classList.contains("dropdown")
            ) {
                setShowSearch(false);
            }
        }
    };

    useEffect(() => {
        const mousedownListener: any = handleClickOutside;
        document.addEventListener('mousedown', mousedownListener);

        return () => {
            document.removeEventListener('mousedown', mousedownListener);
        };
    }, []);

    // handle search 
    // const handleSearch = async (e: any) => {
    //     const inputValue: any = e.target.value;

    //     setSearchPost(inputValue);//error type //solved in type 

    //     if (inputValue.length >= 3) {
    //         refetch()
    //     }

    // }



    return (
        <header ref={headerRef} className={`bg-[#ADEECF] z-50 fixed top-0 flex  items-center left-0 w-full`}>
            <div className={`flex items-center justify-around w-full p-4`}>
                <nav className={`gap-x-4 relative flex items-center justify-center font-semibold`}>
                    <button onClick={handleShowTags} className="md:hidden block">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                        </svg>
                    </button>
                    {/* <button onClick={handleClickShow}><SearchIcon /></button> */}
                    {user && <button onClick={handleClickModal}><PostIcons /></button>}
                    {user ? <Link href={`/profile/` + user?.email}><ProfileIcon /></Link> : (
                        <button onClick={() => signIn('google')}><ProfileIcon /></button>
                    )}
                    {/* {showSearch && <input value={search} onChange={handleSearch} className={"absolute input w-[300px] left-1 -bottom-16"} placeholder={"Cari postingan"} />} */}

                </nav>
                <Link href="/" className={'font-bold uppercase'}>ahalibe</Link>
            </div>

            {isModal && <Modal isModal={isModal} handleModal={handleClickModal} refetchDataTwo={refetchDataTwo} />}

        </header>
    )
}