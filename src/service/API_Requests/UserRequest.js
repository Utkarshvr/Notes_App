import axiosInstance from "../axiosInstance";
import { userRoute } from "../routes";

export const fetchUser = async () => {
  try {
    const { data } = await axiosInstance.get(userRoute);
    if (data?.success) {
      return { data, userDB: data?.payload?.user, errorWhileFetching: false };
    }
  } catch (error) {
    const data = error?.response?.data;
    return { data, userDB: null, error, errorWhileFetching: true };
  }
};
