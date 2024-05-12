import MainLayout from "@/components/MainLayout";
import UsersList from "@/components/UsersList";

export default function members() {
    return(
        <MainLayout refetchDataPost={() => {}}>
        <UsersList/>
        </MainLayout>
    )
}