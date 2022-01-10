import React, { useEffect, useState } from "react";
import axios from "axios";
import Head from "next/head";
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import toast from "react-hot-toast";
import { useWeb3React } from "@web3-react/core";

import Button from "../components/Button";
import { useAuth } from "../hooks/useAuth";
import { Charity, Proposal, Vote } from "../types";
import { API_URI, CLUPANEL_API_URL } from "../constants";
import { useDialog } from "../stores/useDialog";
import CharityModal from "../components/CharityModal";
import MetaTags from "../components/MetaTags";
import Info from "../icons/Info";

interface Props {
  charities: Charity[];
  proposal: Proposal;
  votes: Vote[];
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const data = await axios
    .get<Charity[]>(CLUPANEL_API_URL + "/charities")
    .then((res) => res.data);

  const proposal = await axios
    .get<{ proposals: Proposal[] }>(API_URI + "/v1/voting/proposals")
    .then((res) => res.data.proposals)
    .then((proposals) => proposals.filter((p) => p.state == "active"))
    .then((proposals) => proposals[0]);

  const votes = await axios
    .get<{ votes: Vote[] }>(API_URI + `/v1/voting/votes/${proposal.id}`)
    .then((res) => res.data.votes);

  return {
    props: {
      charities: data,
      proposal,
      votes,
    },
  };
};

const CharityPage: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ charities, proposal, votes }) => {
  const { sign } = useAuth();
  const { account } = useWeb3React();
  const { setDialog } = useDialog();

  const [voted, setVoted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<number | undefined>();

  useEffect(() => {
    if (!account) return;

    setVoted(!!votes.find((v) => v.voter == account));
    setSelected(votes.find((v) => v.voter == account)?.choice - 1);
  }, [account, votes]);

  const submitVote = (choice: number) => {
    if (!account) {
      return toast.error("Please connect your wallet before voting");
    }
    if (!proposal) return; // this should never happen...

    const message = {
      version: "0.1.3",
      timestamp: Math.floor(Date.now() / 1000).toString(),
      space: "clugov.eth",
      type: "vote",
      payload: {
        proposal: proposal.id,
        choice: choice + 1,
        metadata: {},
      },
    };

    setLoading(true);
    sign(JSON.stringify(message))
      .then((signature) =>
        axios
          .post("https://hub.snapshot.org/api/message", {
            address: account,
            msg: JSON.stringify(message),
            sig: signature,
          })
          .then(() => {
            setVoted(true);
            toast.success("Vote successfully registered");
          })
          .catch((e) => {
            toast.error("Something unexpected happened");
          })
      )
      .catch(() => undefined)
      .then(() => setLoading(false));
  };

  return (
    <>
      <Head>
        <title>CLUCoin - Charity</title>
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
        <div className="Charity">
          <div className="CharityHeader">
            <h1 className="Title">Charity</h1>
            <p className="Description">
              CluCoin is dedicated to giving back to those in need.
            </p>
          </div>
          <div className="CharityBody">
            <p className="CharityDescription">
              Vote for who we <span>give back</span> to next:
            </p>
            <div className="CharityGrid">
              {proposal.choices.map((choice, i) => {
                const charity = charities.find(
                  (charity) => charity.name == choice
                );

                if (!charity) {
                  return;
                }

                return (
                  <div
                    key={i}
                    className={`CharityEvent${
                      selected == i ? " Selected" : ""
                    }`}
                  >
                    <Info
                      width={25}
                      height={25}
                      onClick={() =>
                        setDialog(<CharityModal charity={charity} />)
                      }
                    />
                    <img
                      onClick={() => !loading && setSelected(i)}
                      src={`https://cdn.clucoin.com/${charity.image.hash}${charity.image.ext}`}
                      alt={charity.name}
                    />
                  </div>
                );
              })}
            </div>
            <div className="CharityFooter">
              <Button
                loading={loading}
                className="ConfirmVote"
                onClick={() =>
                  typeof selected != "undefined" && submitVote(selected)
                }
              >
                {voted ? "Change Vote" : "Confirm Vote"}
              </Button>
            </div>
          </div>
        </div>
        <div className="WhoHelped">
          <p>Who we have helped so far</p>
          <div className="CharityGrid">
            {charities.map((charity) => {
              if (!charity.donated) return;

              return (
                <div
                  key={charity.id}
                  className="CharityEvent"
                  onClick={() => setDialog(<CharityModal charity={charity} />)}
                >
                  <img
                    src={`https://cdn.clucoin.com/${charity.image.hash}${charity.image.ext}`}
                    alt=""
                  ></img>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default CharityPage;
