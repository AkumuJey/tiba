import providerApi from "@/lib/axios";

// Server-side function to fetch profile data
const fetchProfile = async (cookieHeader: string) => {
  try {
    const response = await providerApi.get("/provider/profile", {
      headers: {
        Cookie: cookieHeader,
      },
    });
    return response.data.profiles;
  } catch (error) {
    console.error("Error fetching profile:", error);
    return null;
  }
};

export default fetchProfile;
