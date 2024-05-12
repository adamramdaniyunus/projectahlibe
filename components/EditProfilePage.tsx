import ImageProfileChange from "@/components/profile/ImageProfileChange";
import FormInputChangeProfile from "@/components/profile/FormInputChangeProfile";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useQuery} from "@tanstack/react-query";
import {getUser} from "@/services/user";
import {useRouter} from "next/router";
import axios from "axios";
import toast from "react-hot-toast";

export default function EditProfilePage(){
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const { email }: any = router.query
    const { userInfo } = useSelector((state: any) => state.user)
    const dispatch: any = useDispatch()
    // get data user
    const {
        data: userDta,
    } = useQuery({
        queryFn: () => getUser(email),
        queryKey: ["profile", email],
        staleTime: 30 * 60 * 1000
    });
    const [desc, setDesc] = useState(userDta?.desc ?? "")
    const [profile, setProfile]= useState<{
        fileUrl: string;
        fileKey: string;
        fileName: string
    }>()
    const [username, setUsername]= useState(userInfo?.user?.name ?? "");

    const updateUserHandler = async (e: any) => {
        e.preventDefault()
        try {
            setLoading(true)
            await axios.put('/api/user?email=' + userDta?.email, {
                desc: desc,
                name: username,
                image:profile?.fileUrl,
            })
            setLoading(false)
            toast.success("Profile updated!")
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className={'lg:ml-[14%] ml-0 flex justify-center lg:mt-0 mt-10'}>
            <div className={'lg:w-1/2 p-2 flex flex-col gap-4 relative w-full'}>
                <h1 className={'md:text-2xl text-xl py-2 text-white font-bold '}>Edit profile</h1>
                <hr/>
                <ImageProfileChange  profile={userInfo?.user?.image} setImage={setProfile} image={profile}/>
                <FormInputChangeProfile updateUserHandler={updateUserHandler} loading={loading} username={username} desc={desc} setUsername={setUsername} setDesc={setDesc}/>
            </div>
        </div>
    )
}