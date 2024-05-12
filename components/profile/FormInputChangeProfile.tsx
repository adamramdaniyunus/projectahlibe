import React, {Dispatch, SetStateAction} from "react";
import toast from "react-hot-toast";
import {Simulate} from "react-dom/test-utils";
import load = Simulate.load;

type FormInputChangeProfileProps = {
    username: string;
    desc:string
    setUsername: Dispatch<SetStateAction<string>>
    setDesc: Dispatch<SetStateAction<string>>
    updateUserHandler: (e:any)=>{}
    loading:boolean
}

export default function FormInputChangeProfile({username, desc, setDesc, setUsername, loading, updateUserHandler}:FormInputChangeProfileProps){

    // this for change input
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name =  e.target.value
        if(name.length >= 50) {
            toast.error("cannot be more than 50 characters")
            return
        }
        setUsername(name);
    };

    const handleInputDescChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const desc =  e.target.value
        if(desc.length > 50) {
            toast.error("cannot be more than 50 characters")
            return
        }
        setDesc(desc)
    }

    return (
        <div className={'flex flex-col'}>
            <form onSubmit={updateUserHandler}>
                <div className={'text-white font-semibold text-sm md:text-lg py-2 relative flex flex-col'}>
                    <h1>
                        Username
                        <span className={'p-2 text-xs text-gray-500 italic lowercase'}>Max 50 characters</span>
                    </h1>
                    <input
                        className={'w-full px-4 py-2 bg-button2 rounded-sm text-white focus:outline-none text-lg'}
                        placeholder={"your name..."} type={'text'}
                        value={username}
                        onChange={handleInputChange}
                    />
                    <p className={'text-sm text-gray-500 absolute right-0 px-2 -bottom-3'}>{username.length}/50</p>
                </div>


                <div className={'text-white font-semibold text-sm md:text-lg py-2 relative flex flex-col'}>
                    <h1>
                        Desc
                        <span className={'p-2 text-xs text-gray-500 italic lowercase'}>Max 50 characters</span>
                    </h1>
                    <input
                        className={'w-full px-4 py-2 bg-button2 rounded-sm text-white focus:outline-none text-lg'}
                        placeholder={"your descriptions..."} type={'text'}
                        value={desc}
                        onChange={handleInputDescChange}
                    />
                    <p className={'text-sm text-gray-500 absolute right-0 px-2 -bottom-3'}>{desc.length}/50</p>

                </div>

                <div className={'w-full mt-10'}>
                    <button type={"submit"} disabled={loading}
                            className={'disabled:bg-gray-500 w-full bg-button px-4 py-2 text-white rounded-sm'}>
                        {loading ? "Loading..." : "Save"}
                    </button>
                </div>
            </form>
        </div>
    )
}