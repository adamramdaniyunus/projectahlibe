import ButtonUpload from "@/components/uploadthings/ButtonUpload";
import React, {Dispatch, SetStateAction} from "react";

type ImageProfileChangeProps = {
    image: ImageState | undefined
    setImage: Dispatch<SetStateAction<ImageState | undefined>>;
    profile:string
}


export default function ImageProfileChange({image, setImage,profile}:ImageProfileChangeProps) {
    return (
        <div className={'flex flex-col mt-4'}>
            <div className={'flex justify-between'}>
                <h1 className={'text-white font-semibold md:text-lg text-sm'}>Upload file must be a <span
                    className={'font-thin text-gray-400 md:text-sm italic text-xs'}> .jpeg, .jpg, .png</span></h1>
            </div>
            <ButtonUpload profile={profile} setImage={setImage} setVideo={()=>{}} video={undefined} image={image}/>
        </div>
    )
}