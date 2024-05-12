import MainLayout from "@/components/MainLayout";
import EditProfilePage from "@/components/EditProfilePage";

export default function EditProfile() {
    return(
        <MainLayout refetchDataPost={()=>{}}>
           <EditProfilePage/>
        </MainLayout>
    )
}