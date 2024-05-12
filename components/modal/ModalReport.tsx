import React, {  useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import Image from "next/image";
import { sendReport } from "@/services/report";

interface ModalProps {
    report: boolean;
    handleShowReport: () => void;
    data: any
}



const ModalReport: React.FC<ModalProps> = ({ handleShowReport, report, data }) => {
    // desc
    const [desc, setDesc] = useState('')
    // loading
    const [loading, setLoading] = useState<boolean>(false)

    const [disabled, setDisabled] = useState(false)

    const modalRef: any = useRef(null);

    const { data: session } = useSession()
    const user = session?.user

    const textareaRef = useRef<HTMLTextAreaElement>(null)

    // useEffect
    useEffect(() => {
        if (modalRef.current) {
            modalRef.current.focus();
        }
    }, [report])

    useEffect(() => {
        // Focus on the textarea element when the value is updated
        if (textareaRef.current && report) {
            textareaRef.current?.focus();
        }
    }, [report]);

    // enter key press
    const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendReport(e)
        }
    };

    // esc key press
    const handleEscPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Escape' && report) {
            e.preventDefault();
            handleShowReport()
        }
    };


    // text area
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

    // send report 
    const handleSendReport = async (e: any) => {
        e.preventDefault()
        try {
            await sendReport({
                user: user?.email,
                desc: desc,
                post: data,
            });
            toast.success("Laporan dikirim")
            handleShowReport()
        } catch (error) {
            console.log(error);
            toast.error("Sepertiny ada kesalahan dalam server")
        }
    }

    return (
        <div onClick={handleShowReport} tabIndex={0} ref={modalRef} onKeyDown={handleEscPress} className={`fixed z-[54] top-0 left-0 h-screen w-screen bg-black bg-opacity-40`}>
            <div className={"flex justify-center items-center h-full"} >
                <div onClick={handleClickInsideModal} className={'w-[500px] modal-shadow bg-primary flex justify-center p-4 rounded-lg'}>
                    <div className={'flex flex-col gap-2 w-full'}>
                        <h1 className={'text-xl font-semibold text-gray-500'}>Kenapa postingan ini?</h1>

                        <form className={'w-full'} onSubmit={handleSendReport}>
                            <div className={'flex gap-2 border-b-2 py-1'}>
                                <Image src={user?.image || ""} alt="profile" loader={() => user?.image || ""} width={0} height={0} className={'rounded-full w-6 h-6'} />
                                <p className={'text-white font-semibold bg-primary'}>{user?.name}</p>
                            </div>
                            <textarea
                                ref={textareaRef}
                                value={desc}
                                onKeyDown={handleKeyPress}
                                onChange={e => setDesc(e.target.value)}
                                className={'post-input bg-primary mt-2 w-full p-2 resize-none'}
                                onInput={handleTextareaInput}
                                style={{color: "white"}}
                                placeholder="Melanggar hak asasi manusia..."
                            ></textarea>
                            <div className="flex justify-end w-full">
                                <button disabled={loading || desc === "" || disabled} type="submit" className={`px-4 py-2 rounded-lg bg-primary mt-2 text-white disabled:bg-slate-300 disabled:cursor-not-allowed text-sm font-semibold`}>{loading ? "Loading..." : "Send"}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalReport