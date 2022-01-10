import React, { useEffect } from "react";
import axios, { AxiosError } from "axios";
import { GetServerSideProps, InferGetStaticPropsType, NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import toast from "react-hot-toast";
import { AUTH_URI } from "../../../constants";

enum Status {
  success,
  error,
}

interface Props {
  message: string;
  status: Status;
}

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const code = ctx.query.code;

  if (!code) {
    return {
      notFound: true,
    };
  }

  return await axios
    .put(AUTH_URI + `/v1/email/${code}`)
    .then(() => {
      return {
        props: {
          status: Status.success,
          message: "Email has been verified successfully",
        },
      };
    })
    .catch((e: AxiosError) => {
      if (e.response?.status == 404) {
        return {
          props: {
            status: Status.error,
            message: "Invalid Verification Code",
          },
        };
      }
      return {
        props: {
          status: Status.error,
          message: "Something unexpected happened",
        },
      };
    });
};

const Verify: NextPage<InferGetStaticPropsType<typeof getServerSideProps>> = (
  props
) => {
  const router = useRouter();

  useEffect(() => {
    if (props.status == Status.error) {
      toast.error(props.message);
    } else {
      toast.success(props.message);
    }

    router.push("/");
  }, [props, router]);

  return <></>;
};

export default Verify;
