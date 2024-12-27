import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useProfile = () => {
  const { data: authUser, isLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        const res = await axios.get("/api/auth/get");
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
  });
  return { authUser, isLoading };
};

export default useProfile;
