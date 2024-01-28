import React, { SetStateAction, useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import axios from 'axios'
import toast from "react-hot-toast";
import Image from "next/image"

interface ModalProps {
    handleModal: () => void;
    refetchUser: () => void;
    userDta: any
}

type TagsItem = {
    name: string;
}


const ModalProfile: React.FC<ModalProps> = ({ handleModal, refetchUser, userDta }) => {
    // opsi tags    // desc
    const [desc, setDesc] = useState(userDta?.desc || '')
    // loading
    const [loading, setLoading] = useState<boolean>(false)


    const [tags, setTags] = useState<string[]>([]);

    const { data: session } = useSession()
    const user = session?.user

    const textareaRef = useRef<HTMLTextAreaElement>(null)

    const handleTextareaInput = () => {
        const textarea = textareaRef.current
        if (textarea) {
            const maxHeight = 300;
            textarea.style.height = 'auto'
            textarea.style.height = textarea.scrollHeight + 'px'
            textarea.style.height = Math.min(textarea.scrollHeight, maxHeight) + 'px';
        }
    }
    const handleClickInsideModal = (e: React.MouseEvent<HTMLDivElement>) => {
        // Menghentikan propagasi ke parent element
        e.stopPropagation();
    };

    const addPostHandler = async (e: any) => {
        e.preventDefault()
        try {
            setLoading(true)
            await axios.put('/api/user?email=' + userDta?.email, {
                desc: desc
            })
            setLoading(false)
            toast.success("Profile di update!")
            setDesc('');
            refetchUser()
            handleModal()
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div onClick={handleModal} className={`fixed z-[54] top-0 left-0 h-screen w-screen bg-black bg-opacity-40`}>
            <div className={"flex justify-center items-center h-full"}>
                <div onClick={handleClickInsideModal} className={'w-[500px] modal-shadow bg-white flex justify-center p-4 rounded-lg'}>
                    <div className={'flex flex-col gap-2 w-full'}>
                        <h1 className={'text-xl font-semibold text-gray-600'}>Update profile kamu</h1>

                        <form className={'w-full'} onSubmit={addPostHandler}>
                            <div className={'flex gap-2 border-b-2 py-1'}>
                                <Image src={user?.image || ""} width={0} height={0} loader={() => user?.image || ""} alt="" className={'rounded-full w-6 h-6'} />
                                <p className={'text-gray-400 font-semibold'}>{user?.name}</p>
                            </div>
                            <textarea
                                ref={textareaRef}
                                value={desc}
                                onChange={e => setDesc(e.target.value)}
                                className={'post-input mt-2 w-full p-2 resize-none'}
                                onInput={handleTextareaInput}
                                placeholder="Description"
                            ></textarea>

                            <div className="flex justify-end w-full">
                                <button disabled={loading} type="submit" className={`px-4 py-2 rounded-lg bg-blue-300 mt-2 text-white disabled:bg-slate-300 disabled:cursor-not-allowed text-sm font-semibold`}>{loading ? "Loading..." : "Save"}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalProfile