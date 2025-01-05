import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BACKEND_URL } from "../utils/util";

const useProfile = () => {
  const { data: authUser, isLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.get(`${BACKEND_URL}/api/auth/get`);
        const data = await res.data;

        if (!data) {
          throw new Error(data.error);
        }
        return data;
      } catch (error) {
        console.log("error in authUser: ", error);
      }
    },
    retry: false,
    retryOnMount: false,
  });
  return { authUser, isLoading };
};

export default useProfile;
