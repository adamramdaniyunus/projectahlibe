import React, { SetStateAction, useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import PostIcons from "@/components/icon/PostIcons";
import { UploadButton } from "@uploadthing/react";
import axios from 'axios'
import { OurFileRouter } from "@/server/uploadthing";
import toast from "react-hot-toast";
import Image from "next/image";
import { createPost, deleteFile } from "@/services/post";
import CloseIcon from "../icon/CloseIcon";

interface ModalProps {
    handleModal: () => void;
    isModal: boolean;
    refetchDataPost: () => void;
}

type TagsItem = {
    name: string;
}


const Modal: React.FC<ModalProps> = ({ handleModal, refetchDataPost, isModal }) => {
    // opsi tags
    const [datatags, setDataTags] = useState<TagsItem[]>([])
    // desc
    const [desc, setDesc] = useState('')
    // loading
    const [loading, setLoading] = useState<boolean>(false)

    // video declare state
    const [video, setVideo] = useState<{
        fileUrl: string;
        fileKey: string;
        fileName: string
    }>();

    // image state
    const [image, setImage] = useState<{
        fileUrl: string;
        fileKey: string;
        fileName: string
    }>();

    const [disabled, setDisabled] = useState(false)

    const modalRef: any = useRef(null);

    const [tags, setTags] = useState<string[]>([]);

    const { data: session } = useSession()
    const user = session?.user

    const textareaRef = useRef<HTMLTextAreaElement>(null)

    // useEffect

    useEffect(() => {
        getTags()
    }, []);

    useEffect(() => {
        if (modalRef.current) {
            modalRef.current.focus();
        }
    }, [isModal])

    useEffect(() => {
        // Focus on the textarea element when the value is updated
        if (textareaRef.current && isModal) {
            textareaRef.current?.focus();
        }
    }, [isModal]);

    // handle tags
    const handlTagsClick = (tag: string) => {
        if (!tags.includes(tag)) {
            setTags([...tags, tag]);
        }
    }

    const handleRemoveTags = (tag: string) => {
        const updatedTags = tags.filter(existingTag => existingTag !== tag);
        setTags(updatedTags);
    }

    // enter key press
    const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            addPostHandler(e);
        }
    };

    // esc key press
    const handleEscPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Escape' && isModal) {
            e.preventDefault();
            handleModal()
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

    const addPostHandler = async (e: any) => {
        e.preventDefault()
        try {
            setLoading(true)
            await createPost({
                user: user?.email,
                video: video?.fileUrl,
                desc,
                tags,
                image: image?.fileUrl,
            })
            setLoading(false)
            toast.success("Postingan berhasil di upload")
            refetchDataPost()
            handleModal()
        } catch (error) {
            console.log(error);
        }
    }
    // get tags

    const getTags = async () => {
        try {
            const response = await axios.get(`/api/tags`)
            setDataTags(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    // delete file
    const deleteFiles = async () => {
        try {
            const url: any = video?.fileUrl || image?.fileUrl
            await deleteFile(url);
            toast.success("File dihapus!");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div onClick={handleModal} tabIndex={0} ref={modalRef} onKeyDown={handleEscPress} className={`fixed z-[54] top-0 left-0 h-screen w-screen bg-black bg-opacity-40`}>
            <div className={"flex justify-center items-center h-full"} >
                <div onClick={handleClickInsideModal} className={'w-[500px] modal-shadow bg-white flex justify-center p-4 rounded-lg'}>
                    <div className={'flex flex-col gap-2 w-full'}>
                        <h1 className={'text-xl font-semibold text-gray-600'}>Share klip gg kamu</h1>

                        <form className={'w-full'} onSubmit={addPostHandler}>
                            <div className={'flex gap-2 border-b-2 py-1'}>
                                <Image src={user?.image || ""} alt="profile" loader={() => user?.image || ""} width={0} height={0} className={'rounded-full w-6 h-6'} />
                                <p className={'text-gray-400 font-semibold'}>{user?.name}</p>
                            </div>
                            <textarea
                                ref={textareaRef}
                                value={desc}
                                onKeyDown={handleKeyPress}
                                onChange={e => setDesc(e.target.value)}
                                className={'post-input mt-2 w-full p-2 resize-none'}
                                onInput={handleTextareaInput}
                                placeholder="Good Game.."
                            ></textarea>
                            <div className={'flex flex-col justify-between gap-2'}>

                                <div>
                                    <div className={'flex gap-2 flex-wrap mt-4 mx-2'}>
                                        {tags && tags.map((tags, i) => (
                                            <div
                                                onClick={() => handleRemoveTags(tags)}
                                                key={i}
                                                className={'tags-button flex items-center rounded-lg cursor-pointer hover:bg-red-300 bg-primary lowercase'}>
                                                <p className={'italic font-semibold text-white'}>#{tags}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex justify-between w-full items-center">
                                    <div className="flex gap-2">
                                        {video && (
                                            <p className="text-gray-400 text-sm flex gap-2 items-center">{video?.fileName} <span className="cursor-pointer" onClick={deleteFiles}><CloseIcon /></span></p>
                                        )}
                                        {image && <p className="text-gray-400 text-sm flex gap-2 items-center">{image?.fileName} <span className="cursor-pointer" onClick={deleteFiles}><CloseIcon /></span></p>}
                                    </div>
                                    {video === undefined && image === undefined && <UploadButton<OurFileRouter, any>
                                        endpoint="imageUploader"
                                        content={{
                                            allowedContent: "Masukan file max 50mb",
                                            button({ ready, isUploading }) {
                                                if (isUploading) {
                                                    setDisabled(true)
                                                }
                                                if (ready) {
                                                    setDisabled(false);
                                                    return <PostIcons color={false} />
                                                }
                                            },
                                        }}
                                        className={`mt-4 ut-button:w-14 ut-button:p-2 ut-uploading:ut-button:cursor-wait  ut-button:bg-white z-50 ut-button:border-none text-black ut-button:ut-readying:bg-white ut-uploading:ut-button:border-none`}
                                        onClientUploadComplete={(res) => {
                                            if (res && res.length > 0) {
                                                const firstFile = res[0];
                                                const mappedFile = {
                                                    fileUrl: firstFile.url,
                                                    fileKey: firstFile.key,
                                                    fileName: firstFile.name,
                                                };

                                                // if user send image not video
                                                const imagesFile = [".jpg", ".png", ".jpeg", ".gif"];
                                                const fileExtension = firstFile.name.substr(firstFile.name.lastIndexOf('.')).toLocaleLowerCase();

                                                if (imagesFile.includes(fileExtension)) {
                                                    setImage(mappedFile)
                                                } else {
                                                    setVideo(mappedFile);
                                                }

                                            }
                                        }}

                                        onUploadError={(error: Error) => {
                                            // Do something with the error.
                                            toast.error(error.message)
                                        }}
                                    />}
                                </div>


                            </div>

                            <div className={'mt-4 flex flex-col'}>
                                <h1 className={'text-gray-400 text-sm font-semibold'}>Add tags</h1>
                                <div className={'flex gap-2 flex-wrap mt-4'}>
                                    {datatags.map((hastags, i) => (
                                        <div
                                            key={i}
                                            onClick={() => handlTagsClick(hastags.name)} className={'tags-button lowercase bg-primary flex items-center rounded-lg cursor-pointer'}>
                                            <p className={'italic font-semibold text-white'}>#{hastags.name}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="flex justify-end w-full">
                                <button disabled={loading || desc === "" || disabled} type="submit" className={`px-4 py-2 rounded-lg bg-primary mt-2 text-white disabled:bg-slate-300 disabled:cursor-not-allowed text-sm font-semibold`}>{loading ? "Loading..." : "Upload"}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal