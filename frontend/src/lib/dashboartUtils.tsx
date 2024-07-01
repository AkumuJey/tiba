import providerApi from "./axios";

export interface Profile {
  createdAt: string;
  firstName: string;
  lastName: string;
  title: string;
  email: string;
  phoneNo: string;
  age: number | null;
  verified: boolean;
  subscribed: boolean;
}
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
