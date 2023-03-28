import { useSelector } from "react-redux";

export default function useAuth() {
  const auth = useSelector((state) => state.auth);

  if (auth?.jwt && auth?.user) {
    return true;
  } else {
    return false;
  }
}
