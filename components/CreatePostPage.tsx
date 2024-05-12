import ImageCreatePost from "@/components/posts/ImageCreatePost";
import {useRef, useState} from "react";
import FormInputCreatePost from "@/components/posts/FormInputCreatePost";
import {useSession} from "next-auth/react";
import {createPost, deleteFile} from "@/services/post";
import toast from "react-hot-toast";
import {useRouter} from "next/router";


export default function CreatePostPage() {
    const [loading, setLoading] = useState<boolean>(false)
    const [desc, setValueDesc]=useState("")
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
    const [tags, setTags] = useState<string[]>([]);
    const { data: session } = useSession()
    const user = session?.user
    const router = useRouter()

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
            router.push('/')
            // refetchDataPost()
        } catch (error) {
            console.log(error);
        }
    }

    // delete file from uploadthing
    const deleteFiles = async () => {
        try {
            const url: any = video?.fileUrl || image?.fileUrl
            await deleteFile(url);
            toast.success("File dihapus!");
            setImage(undefined)
            setVideo(undefined)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className={'lg:ml-[14%] ml-0 flex justify-center lg:mt-0 mt-10'}>
            <div className={'lg:w-1/2 p-2 flex flex-col gap-4 relative w-full'}>
                <h1 className={'md:text-2xl text-xl py-2 text-white font-bold '}>Upload Meme or Clip</h1>
                <hr/>
                <ImageCreatePost video={video} image={image} deleteFiles={deleteFiles} setImage={setImage} setVideo={setVideo}/>
                <FormInputCreatePost desc={desc} setValueDesc={setValueDesc} setTags={setTags} addPostHandler={addPostHandler} loading={loading} setLoading={setLoading}/>
            </div>
        </div>
    );
}
