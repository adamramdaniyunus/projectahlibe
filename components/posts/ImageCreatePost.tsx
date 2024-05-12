import {OurFileRouter} from "@/server/uploadthing";
import PostIcons from "@/components/icon/PostIcons";
import toast from "react-hot-toast";
import React, {Dispatch, SetStateAction} from "react";
import {UploadButton} from "@/utils/uploadthing";
import ButtonUpload from "@/components/uploadthings/ButtonUpload";



type ImagePostProps = {
    setVideo: Dispatch<SetStateAction<VideoState | undefined>>;
    setImage: Dispatch<SetStateAction<ImageState | undefined>>
    deleteFiles: ()=>void;
    video:VideoState | undefined;
    image: ImageState | undefined;
}

export default function ImageCreatePost({setImage, setVideo, video, image, deleteFiles}:ImagePostProps){
    return (
        <div className={'flex flex-col mt-4'}>
            <div className={'flex justify-between'}>
                <h1 className={'text-white font-semibold md:text-lg text-sm'}>Upload file must be a <span
                    className={'font-thin text-gray-400 md:text-sm italic text-xs'}>.mp4, jpeg, jpg, png</span></h1>
                {video && <h1 onClick={deleteFiles} className={'text-red-700 text-sm cursor-pointer'}>
                    remove
                </h1> || image && <h1 onClick={deleteFiles} className={'text-red-700 text-sm cursor-pointer'}>
                    remove
                </h1>}
            </div>
            <ButtonUpload profile={""} setImage={setImage} setVideo={setVideo} video={video} image={image}/>
        </div>
    )
}