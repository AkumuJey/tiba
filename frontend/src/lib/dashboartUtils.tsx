import providerApi from "./axios";

export const fetchProfile = async (cookieHeader: string) => {
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
