import { cookies } from "next/headers";

export const getCookies = () => {
  const tokenCookie = cookies().get("token");
  return tokenCookie ? `token=${tokenCookie.value}` : "";
};
