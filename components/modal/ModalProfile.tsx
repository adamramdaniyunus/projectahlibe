import React, { SetStateAction, useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import axios from 'axios'
import toast from "react-hot-toast";
import Image from "next/image"

interface ModalProps {
    handleModal: () => void;
    refetchUser: () => void;
    isModal: boolean;
    userDta: any
}

type TagsItem = {
    name: string;
}


const ModalProfile: React.FC<ModalProps> = ({ handleModal, refetchUser, userDta, isModal }) => {
    // opsi tags    // desc
    const [desc, setDesc] = useState(userDta?.desc || '')
    const [name, setName] = useState(userDta?.name)
    // loading
    const [loading, setLoading] = useState<boolean>(false)

    const { data: session } = useSession()
    const user = session?.user
    const modalRef: any = useRef(null)
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

    const updateUserHandler = async (e: any) => {
        e.preventDefault()
        try {
            setLoading(true)
            await axios.put('/api/user?email=' + userDta?.email, {
                desc: desc,
                name: name
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

    useEffect(() => {
        if (modalRef.current) {
            modalRef.current.focus();
        }
    }, [isModal])

    // went user click enter
    const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            updateUserHandler(e);
        }
    };

    // esc key press
    const handleEscPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Escape' && isModal) {
            e.preventDefault();
            handleModal()
        }
    };

    return (
        <div onClick={handleModal} ref={modalRef} onKeyDown={handleEscPress} tabIndex={0} className={`fixed z-[54] top-0 left-0 h-screen w-screen bg-black bg-opacity-40`}>
            <div className={"flex justify-center items-center h-full"}>
                <div onClick={handleClickInsideModal} className={'w-[500px] modal-shadow bg-primary flex justify-center p-4 rounded-lg'}>
                    <div className={'flex flex-col gap-2 w-full'}>
                        <h1 className={'text-xl font-semibold text-gray-500'}>Update profile kamu</h1>

                        <form className={'w-full'} onSubmit={updateUserHandler}>
                            <div className={'flex gap-2 border-b-2 py-1'}>
                                <Image src={user?.image || ""} width={0} height={0} loader={() => user?.image || ""} alt="" className={'rounded-full w-6 h-6'} />
                                <input className={'text-white font-semibod bg-primary w-full outline-none'} value={name} onChange={e => setName(e.target.value)} />
                            </div>
                            <textarea
                                ref={textareaRef}
                                value={desc}
                                onKeyDown={handleKeyPress}
                                onChange={e => setDesc(e.target.value)}
                                className={'post-input mt-2 w-full p-2 resize-none bg-primary'}
                                onInput={handleTextareaInput}
                                style={{ color: 'white' }}
                                placeholder="Description"
                            ></textarea>

                            <div className="flex justify-end w-full">
                                <button disabled={loading} type="submit" className={`px-4 py-2 rounded-lg bg-primary mt-2 text-white disabled:bg-slate-300 disabled:cursor-not-allowed text-sm font-semibold`}>{loading ? "Loading..." : "Save"}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalProfile