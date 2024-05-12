import React, {Dispatch, SetStateAction} from "react";
import ButtonUploadImage from "@/components/uploadthings/ButtonUploadImage";

type ImageProfileChangeProps = {
    image: ImageState | undefined
    video: VideoState | undefined
    setImage: Dispatch<SetStateAction<ImageState | undefined>>;
    setVideo: Dispatch<SetStateAction<VideoState | undefined>>;
    profile:string
}


export default function ImageProfileChange({image, setImage,profile, video, setVideo}:ImageProfileChangeProps) {
    return (
        <div className={'flex flex-col mt-4'}>
            <div className={'flex justify-between'}>
                <h1 className={'text-white font-semibold md:text-lg text-sm'}>Upload file must be a <span
                    className={'font-thin text-gray-400 md:text-sm italic text-xs'}> .jpeg, .jpg, .png</span></h1>
            </div>
            <ButtonUploadImage profile={profile} setImage={setImage} setVideo={setVideo} video={video} image={image}/>
        </div>
    )
}