import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import axios from "axios";
import {useQuery} from "@tanstack/react-query";
import {getTags} from "@/services/tags";
import toast from "react-hot-toast";

type FormInputCreatePostProps = {
    setTags: Dispatch<SetStateAction<string[]>>;
    setValueDesc:Dispatch<SetStateAction<string>>;
    desc: string;
    loading:boolean;
    setLoading:Dispatch<SetStateAction<any>>
    addPostHandler:(e:any)=>void
}

export default function FormInputCreatePost({setTags, setValueDesc, desc, addPostHandler, loading}:FormInputCreatePostProps){

    const [showListTags, setShowList] = useState(false);
    const [inputTags, setInputTags] = useState("");
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const handleClick = () => {
        setShowList(prev=>!prev)
    }

    const { data: dataTags, isLoading: LoadingTags } = useQuery({
        queryFn: () => getTags(),
        queryKey: ["tags"]
    })


    // ini berguna untuk user yang mengisi tags manual
    useEffect(() => {
        const tagsArray = inputTags.split(",").map(tag => tag.trim());
        setTags(tagsArray.filter(tag => tag !== ""));
        setSelectedTags(tagsArray.filter(tag => tag !== ""));
    }, [inputTags]);

    // dan ini berguna untuk user yang memilih tags yang sudah ada
    const handleTagClick = (tagName: string) => {
        const newTags = [...selectedTags, tagName];
        setTags(newTags)
        setSelectedTags(newTags);
        const tagsString = newTags.join(", ");
        setInputTags(tagsString);
    };


    // this for change input
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputTags(event.target.value);
    };

    const handleInputDescChange = (e: React.ChangeEvent<HTMLInputElement>) => {
       const desc =  e.target.value
        if(desc.length > 100) {
            toast.error("cannot be more than 100 characters")
            return
        }
        setValueDesc(desc)
    }

    return (
        <div className={'flex flex-col'}>
            <form onSubmit={addPostHandler}>
                <div className={'text-white font-semibold text-sm md:text-lg py-2 relative flex flex-col'}>
                    <h1>
                        Captions
                        <span className={'p-2 text-xs text-gray-500 italic lowercase'}>Max 100 characters</span>
                    </h1>
                    <input
                        className={'w-full px-4 py-2 bg-button2 rounded-sm text-white focus:outline-none text-lg'}
                        placeholder={"GG Gaming"} type={'text'}
                        value={desc}
                        onChange={handleInputDescChange}
                    />
                    <p className={'text-sm text-gray-500 absolute right-0 px-2 -bottom-3'}>{desc.length}/100</p>
                </div>


                <div className={'text-white font-semibold text-sm md:text-lg py-2 relative flex flex-col'}>
                    <h1>
                        Tags
                    </h1>
                    <input
                        className={'w-full px-4 py-2 bg-button2 rounded-sm text-white focus:outline-none text-lg'}
                        placeholder={"gg, ahalibe, kocak"} type={'text'}
                        value={inputTags}
                        onChange={handleInputChange}
                    />

                    <p className={'text-sm text-blue-600 py-2 cursor-pointer '} onClick={handleClick}>popular tags</p>

                    {showListTags && <div className={'flex gap-1 flex-wrap mt-4'}>
                        {dataTags?.map((hastags: TagsItem, i: number) => (
                            <div
                                key={i}
                                className={"tags-button lowercase bg-primary flex items-center rounded-lg cursor-pointer"}
                                onClick={() => handleTagClick(hastags.name)}
                            >
                                <p className={"italic font-semibold text-white"}>#{hastags.name}</p>
                            </div>
                        ))}
                    </div>}
                </div>

                <div className={'w-full mt-10'}>
                    <button type={"submit"} disabled={loading} className={'disabled:bg-gray-500 w-full bg-button px-4 py-2 text-white rounded-sm'}>
                        {loading ? "Uploading..." : "Upload"}
                    </button>
                </div>
            </form>
        </div>
    )
}