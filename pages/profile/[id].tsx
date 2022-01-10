import axios from "axios";
import Head from "next/head";
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { useMemo } from "react";
import React, { useEffect, useState } from "react";
import { API_URI, AUTH_URI, isServer, nftImages } from "../../constants";
import { User } from "../../types";
import cookie from "cookie";
import Image from "next/image";
import { useUser } from "../../stores/useUser";
import { useCLUContract } from "../../hooks/useContract";
import { BigNumber, Contract, ethers } from "ethers";
import { getBadgesFromBalance } from "../../utils/balance";
import MaticABI from "../../utils/MaticAbi.json";
import { WithAuth } from "../../components/withAuth";

interface Props {
  user: User & { badges?: any[] };
}

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const id = ctx.params.id;
  const cookies = cookie.parse(ctx.req.headers.cookie || "");

  let url;
  if (id == "@me") {
    url = AUTH_URI + "/v1/users/@me";
  } else {
    url = API_URI + `/v1/users/${id}`;
  }

  if (!cookies.token) {
    return {
      notFound: true,
    };
  }

  const user = await axios
    .get<User>(url, { headers: { Authorization: cookies.token } })
    .then((res) => res.data)
    .catch(() => undefined);

  if (!user) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      user,
    },
  };
};

const Profile: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ user }) => {
  const CLUContract = useCLUContract();
  const currentUser = useUser((s) => s.user);

  const [balance, setBalance] = useState<number | undefined>();
  const [nfts, setnfts] = useState<{ [k: number]: BigNumber } | undefined>();

  useEffect(() => {
    if (CLUContract && user.id == currentUser?.id) {
      Promise.all(
        user.wallets.map(
          (wallet) => CLUContract.balanceOf(wallet.address) as BigNumber
        )
      )
        .then((balances) => balances.reduce((a, b) => a.add(b)))
        .then((balance) => {
          setBalance(+ethers.utils.formatEther(balance) * 10 ** 9);
        });
    }
  }, [user, currentUser, CLUContract]);

  useEffect(() => {
    if (user.id != currentUser?.id) return;

    const provider = new ethers.providers.JsonRpcProvider(
      "https://rpc-mainnet.maticvigil.com/"
    );

    const contract = new Contract(
      "0x39BD630610225D11D3E18EcEf25C9dE4F42EdCEC",
      MaticABI,
      provider
    );

    const questsContract = new Contract(
      "0x87ea0dd38a3ca3e4f6a59be98a8586823cebe94f",
      MaticABI,
      provider
    );

    const nftsOwned = {};

    Promise.all(
      user.wallets.map((wallet) => {
        return Promise.all([
          ...new Array(4).fill(0).map((_, i) => {
            return contract.balanceOf(wallet.address, i + 1);
          }),
          ...new Array(1).fill(0).map((_, i) => {
            return questsContract.balanceOf(wallet.address, i + 1);
          }),
        ]);
      })
    ).then((wallets) => {
      wallets.forEach((wallet) => {
        wallet.forEach((nft, i) => {
          if (nftsOwned[i + 1]) {
            nftsOwned[i + 1].add(nft);
          } else {
            nftsOwned[i + 1] = nft;
          }
        });
      });

      setnfts(nftsOwned);
    });
  }, [user, currentUser]);

  const badges = useMemo(
    () =>
      user.allow_public_badges && user.id != currentUser?.id
        ? user.badges
        : balance
        ? getBadgesFromBalance(balance)
        : undefined,
    [user, currentUser, balance]
  );

  return (
    <>
      <Head>
        <title>CluCoin - {user.username}</title>
      </Head>
      <WithAuth>
        <div className="Container">
          <div className="Profile">
            <Image
              src={`https://ipfs.io/ipfs/${user.avatar_hash}`}
              alt="Your Avatar"
              width="100px"
              height="100px"
              className="avatar"
            />
            <h4>{user.username}</h4>
          </div>
          <div className="NFTCollection">
            <h3>Badges</h3>
            <div className="NFTBadges">
              {badges?.map((url, i) => {
                return (
                  <div key={i}>
                    <Image
                      src={url[0]}
                      width="150px"
                      height="150px"
                      alt={url[1]}
                      className="nft"
                    />
                    <p>
                      <strong>{url[1]}</strong>
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="NFTCollection">
            <h3>NFT Collection</h3>
            <div className="NFTBoxes">
              {nfts
                ? Object.keys(nfts).map((i) => {
                    const id = +i > 4 ? +i - 4 : i;
                    const address =
                      +i > 4
                        ? "0x87ea0dd38a3ca3e4f6a59be98a8586823cebe94f"
                        : "0x39bd630610225d11d3e18ecef25c9de4f42edcec";

                    if (!nfts[i] || nfts[i] < 1) {
                      return null;
                    }

                    return (
                      <div key={i}>
                        <div className="NFTBox">
                          <a
                            href={`https://opensea.io/assets/matic/${address}/${id}`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <Image
                              src={nftImages[+i - 1][0]}
                              alt="Your Avatar"
                              width="300px"
                              height="300px"
                            />
                          </a>
                        </div>
                        <h4>{nftImages[+i - 1][1]}</h4>
                        <p>
                          <strong>You Own: {nfts[i].toString() || "0"}</strong>
                        </p>
                      </div>
                    );
                  })
                : null}
            </div>
          </div>
        </div>
      </WithAuth>
    </>
  );
};

export default Profile;
