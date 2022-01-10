import React from "react";
import Head from "next/head";
import Link from "next/link";
import MetaTags from "../components/MetaTags";

const NotFound = () => {
  return (
    <>
      <Head>
        <title>CLUCoin - NotFound</title>
        <MetaTags
          title="CLUCoin"
          description="CluCoin is a deflationary smart token with a long term charity focus and vision."
        />
      </Head>
      <div className="Container">
        <div className="WhitePaper">
          <h1 className="Error404">404</h1>
          <h4 className="NotFoundError">Not Found</h4>
          <p className="NotFoundText">
            Sorry, we couldn&#39;t find the page you
            <br /> were looking for.
          </p>

          <Link href="/" passHref>
            <span className="ReadPaper">Back To Home</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFound;
