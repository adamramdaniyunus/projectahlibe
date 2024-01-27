import React, { SetStateAction, useEffect, useRef, useState } from "react";
interface ModalProps {
    handleModal: () => void;
    handleDeletePost: () => void;
}

type TagsItem = {
    name: string;
}


const ModalConfirm: React.FC<ModalProps> = ({ handleModal, handleDeletePost }) => {
    // loading
    const [loading, setLoading] = useState<boolean>(false)
    const handleClickInsideModal = (e: React.MouseEvent<HTMLDivElement>) => {
        // Menghentikan propagasi ke parent element
        e.stopPropagation();
    };

    return (
        <div onClick={handleModal} className={`fixed z-[54] top-0 left-0 h-screen w-screen bg-black bg-opacity-40`}>
            <div className={"flex justify-center items-center h-full"}>
                <button onClick={handleDeletePost}>Ya, Hapus</button>
                <button onClick={handleModal}>Ga jadi deh</button>
                <div onClick={handleClickInsideModal} className={'w-[500px] modal-shadow bg-white flex justify-center p-4 rounded-lg'}>
                    <div className={'flex flex-col gap-2 w-full'}>
                        <h1 className={'text-xl font-semibold text-gray-600'}>Hapus postingan?</h1>
                        <div className="flex gap-2 justify-end">
                            <button className="px-4 py-2 bg-red-400 text-white rounded-lg" onClick={handleDeletePost}>Ya, hapus</button>
                            <button className="px-4 py-2 bg-blue-400 text-white rounded-lg" onClick={handleModal}>Ga jadi deh</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalConfirm