import providerApi from "./axios";
import { getCookies } from "./getCookies";

const cookieHeader = getCookies();

export const fetchProfile = async () => {
  try {
    const response = await providerApi.get("/profile", {
      headers: {
        Cookie: cookieHeader,
      },
    });
    return response.data.profile;
  } catch (error) {
    return null;
  }
};
