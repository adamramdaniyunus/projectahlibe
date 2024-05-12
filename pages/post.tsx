import MainLayout from "@/components/MainLayout";
import CreatePostPage from "@/components/CreatePostPage";

export default function post(){
    return(
        <MainLayout refetchDataPost={() => {}}>
            <CreatePostPage/>
        </MainLayout>

    );
}
