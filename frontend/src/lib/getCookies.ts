import { cookies } from "next/headers";

export const getCookies = (): string => {
  const tokenCookie = cookies().get("token");
  return tokenCookie ? `token=${tokenCookie.value}` : "";
};
