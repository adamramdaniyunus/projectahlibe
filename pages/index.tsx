import HomePage from "@/components/HomePage";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { userActions } from "./store/reducers/userReducers";


export default function Home() {

  const { data: session } = useSession()
  const dispatch = useDispatch();

  if (session) {
    dispatch(userActions.setUserInfo(session));
    localStorage.setItem("userdata", JSON.stringify(session));
  };

  return (
    <>
      <HomePage nameTags={[]} />
    </>
  )
}
