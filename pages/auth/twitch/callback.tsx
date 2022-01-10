import { useEffect } from "react";
import axios from "axios";
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { useRouter } from "next/dist/client/router";
import toast from "react-hot-toast";
import cookie from "cookie";
import { AUTH_URI, origin } from "../../../constants";

type Status = "success" | "failed";

interface Props {
  status: Status;
  message: string;
}

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const { code } = ctx.query;
  const cookies = cookie.parse(ctx.req.headers.cookie);

  if (!code || !cookies.token) {
    return {
      notFound: true,
    };
  }

  return await axios
    .get(AUTH_URI + "/v1/integrations/twitch/callback", {
      params: { code, callback: `${origin}/auth/twitch/callback` },
      headers: { Authorization: cookies.token },
    })
    .then((req) => {
      return {
        props: {
          status: "success" as Status,
          message: "Connected to twitch successfully.",
        },
      };
    })
    .catch((e) => {
      return {
        props: {
          status: "failed" as Status,
          message: "Failed to connect to twitch.",
        },
      };
    });
};

const TwitchCallback: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = (props) => {
  const router = useRouter();

  useEffect(() => {
    if (props.status == "success") {
      toast.success(props.message);
    } else {
      toast.error(props.message);
    }

    router.replace("/profile/settings");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <></>;
};

export default TwitchCallback;
