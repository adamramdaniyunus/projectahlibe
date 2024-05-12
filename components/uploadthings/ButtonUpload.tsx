import {UploadButton} from "@/utils/uploadthing";
import toast from "react-hot-toast";
import React, {Dispatch, SetStateAction} from "react";
import Image from "next/image";
import ReactPlayer from "react-player";
import {useRouter} from "next/router";

type ButtonUploadProps = {
    setVideo: Dispatch<SetStateAction<VideoState | undefined>>;
    setImage: Dispatch<SetStateAction<ImageState | undefined>>;
    video:VideoState | undefined;
    image: ImageState | undefined;
    profile: string

}

export default function ButtonUpload({setImage, setVideo, image, video, profile}:ButtonUploadProps) {

    if(image && !profile) {
        return(
            <div className={'w-full h-[300px]'}>
                <Image src={image.fileUrl} loader={()=>image?.fileUrl} alt={"Image"} width={0} height={0}
                       className={"h-full w-full"}
                />
            </div>
        )
    }

    if(video) {
        return (
            <div className={'w-full h-[300px]'}>
                <ReactPlayer
                    width="100%"
                    height="100%"
                    url={video.fileUrl}
                    controls={true}
                    disablePictureInPicture={true}
                />
            </div>
        )
    }



    return (
        <UploadButton<any>
            endpoint="imageUploader"
            content={{
                allowedContent: profile.length ? "Masukan file max 10mb" : "Masukan file max 100mb",
                button({ready, isUploading}) {
                    if (ready) {
                        return profile.length || image ? <div
                            className={'flex justify-center items-center w-full rounded-md h-[300px]'}>
                                <Image src={image ? image.fileUrl : profile} alt={"Profile"} height={0} width={0} className={"w-[100px] h-[100px] rounded-full"} loader={()=>image ? image.fileUrl : profile}/>
                        </div> : <div
                            className={'flex justify-center items-center w-full rounded-md h-[300px]'}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                 strokeWidth={1.5}
                                 stroke="white" className="w-[50px] h-[50px]">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"/>
                            </svg>
                        </div>
                    }
                },
            }}
            className={`mt-4 ut-button:w-full ut-button:h-[300px] ut-button:focus:outline-none ut-button:p-2 ut-uploading:ut-button:cursor-wait  ut-button:bg-button2 ut-button:hover:bg-gray-800 z-50 ut-button:border-none text-black ut-uploading:ut-button:border-none`}
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
        />
    )
}