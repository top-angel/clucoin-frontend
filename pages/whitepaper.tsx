import Head from "next/head";
import Image from "next/image";
import axios from "axios";
import Button from "../components/Button";
import { AUTH_URI } from "../constants";
import { useUser } from "../stores/useUser";
import MetaTags from "../components/MetaTags";

export default function WhitePaper() {
  const token = useUser((s) => s.token);
  const userLoading = useUser((s) => s.loading);

  return (
    <>
      <Head>
        <title>CluCoin - White paper</title>
        <MetaTags
          title="CLUCoin"
          description="CluCoin is a deflationary smart token with a long term charity focus and vision."
          image={{
            url: "https://cdn.discordapp.com/attachments/455777545485549589/861600665575227452/Outbound_Oasis_1920_x_1080_Version.jpg",
            width: 1200,
            height: 630,
            alt: "CluCoin is a deflationary smart token with a long term charity focus and vision.",
          }}
        />
      </Head>
      <div className="Container">
        <div className="WhitePaper">
          <div className="WhitePaperBody">
            <Image
              src="/assets/clulogo.svg"
              alt="Clucoin"
              width="185"
              height="185"
            />
          </div>

          <h1 className="Title">White Paper</h1>

          <p className="WhitePaperDescription">
            Our White paper is designed to be easily readable for users who are
            new to crypto while also touching on the more technical pieces to
            help all users understand how they can benefit from investing in
            CluCoin and help people all over the world.
          </p>

          <a
            href="https://ipfs.clucoin.com/ipfs/QmSzWgWYJDoM4TWoCHss4fAG6RbR4qGm7yceQv1rBqBsKo"
            target="blank"
            className="ReadPaper"
          >
            <Button
              loading={userLoading}
              onClick={() => {
                if (token) {
                  axios.put(
                    AUTH_URI + "/v1/users/@me/whitepaper",
                    {},
                    { headers: { Authorization: token } }
                  );
                }
              }}
            >
              Read White Paper
            </Button>
          </a>
        </div>
      </div>
    </>
  );
}
