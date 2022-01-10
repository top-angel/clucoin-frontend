import { useRouter } from "next/dist/client/router";
import React, { useRef } from "react";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";
import { isServer } from "../constants";
import { useUser } from "../stores/useUser";

export const WithAuth: React.FC = ({ children }) => {
  const router = useRouter();
  const [cookies] = useCookies();
  const { user, loading, token: user_token } = useUser();

  const wasLoggedIn = useRef<boolean>(false);

  useEffect(() => {
    if (!cookies.token) {
      if (!wasLoggedIn.current) {
        toast.error("You should be logged in to access that page.");
      }
      router.push("/");
    } else {
      wasLoggedIn.current = true;
    }
  }, [router, cookies]);

  if (isServer) {
    return <></>;
  }

  const token = cookies.token;

  if (loading) {
    return <p>loading...</p>;
  }

  if (!user) {
    if (!token) {
      return <></>;
    } else {
      if (!user_token) {
        return <p>loading...</p>;
      }

      return <p>Something unexpected happened</p>;
    }
  }

  return <>{children}</>;
};
