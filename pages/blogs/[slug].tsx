import React, { useEffect, useState } from "react";
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  faFacebookF,
  faReddit,
  faWhatsapp,
  faFlipboard,
  faLinkedinIn,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import ReactTooltip from 'react-tooltip';

import { BlogPost } from "../../types";
import MetaTags from "../../components/MetaTags";
import { CLUPANEL_API_URL, origin } from "../../constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";

const Description = dynamic(import("../../components/Markdown"), {
  ssr: false,
});

interface Props {
  blog: BlogPost;
}

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const slug = ctx.query.slug;

  if (!slug) {
    return {
      notFound: true,
    };
  }

  const data = await axios
    .get<BlogPost>(CLUPANEL_API_URL + "/blogs/" + slug)
    .then((res) => res.data)
    .catch(() => undefined);

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      blog: data,
    },
  };
};

const ShareLink = (props: { url: string; icon: any; for: string; tip: string; }) => {
  return (
    <>
      <a href={props.url} data-for={props.for} data-tip={props.tip} target="_blank" rel="noreferrer">
        <FontAwesomeIcon icon={props.icon} width={46} className="social-item" />
      </a>
      <ReactTooltip
        id={props.for}
        className='tooltip'
        textColor='white'
        backgroundColor='#ef008e'
        effect='solid'
      />
    </>
  );
};

const Blog: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> =
  ({ blog }) => {
    const router = useRouter();

    return (
      <>
        <Head>
          <title>CLUCoin - {blog.title}</title>
          <MetaTags
            title={blog.title}
            description={blog.description.slice(0, 150) + "..."}
            image={{
              url: `https://cdn.clucoin.com/${blog.image.hash}${blog.image.ext}`,
              height: blog.image.height,
              width: blog.image.width,
              alt: blog.title,
            }}
          />
        </Head>
        <div className="Container">
          <div className="Blog">
            <div className="BlogHeader">
              <img
                src={`https://cdn.clucoin.com/${blog.image.hash}${blog.image.ext}`}
                alt={blog.title}
              />
            </div>
            <div className="BlogDescription">
              <div className="BlogDescriptionHeader">
                <h1 className="BlogTitle">{blog.title}</h1>
                <p className="BlogDate">{new Date(blog.date).toDateString()}</p>
              </div>
              <Description>{blog.description}</Description>
              <h5 className="share-title">Share</h5>
              <div className="socials">
                <ShareLink
                  icon={faFacebookF}
                  url={`https://www.facebook.com/sharer.php?u=${
                    origin + router.asPath
                  }`}
                  for='facebook-tooltip'
                  tip='Facebook'
                />
                <ShareLink
                  icon={faTwitter}
                  url={`https://twitter.com/share?url=${
                    origin + router.asPath
                  }&hashtags=CluCoin`}
                  for='twitter-tooltip'
                  tip='Twitter'
                />
                <ShareLink
                  icon={faWhatsapp}
                  url={`https://api.whatsapp.com/send?text=${
                    origin + router.asPath
                  }`}
                  for='whatsapp-tooltip'
                  tip='WhatsApp'
                />
                <ShareLink
                  icon={faLinkedinIn}
                  url={`https://www.linkedin.com/shareArticle?url=${
                    origin + router.asPath
                  }`}
                  for='linkedin-tooltip'
                  tip='LinkedIn'
                />
                <ShareLink
                  icon={faReddit}
                  url={`https://reddit.com/submit?url=${
                    origin + router.asPath
                  }`}
                  for='reddit-tooltip'
                  tip='Reddit'
                />
                <ShareLink
                  icon={faFlipboard}
                  url={`https://share.flipboard.com/bookmarklet/popout?url=${
                    origin + router.asPath
                  }`}
                  for='flipboard-tooltip'
                  tip='Flipboard'
                />
              </div>
            </div>
            <div className="BlogFooter">
              <div className="PostedBy">
                {/* <div className="Avatar">
                  <img
                    src="https://www.gravatar.com/avatar/70c36d8c962558e8e864d8047462abc6?s=250&d=mm&r=x"
                    alt="User.."
                  />
                </div> */}
                <div className="Description">
                  <p className="PostedByName">Written by</p>
                  <p className="AuthorName">{blog.authorname}</p>
                </div>
              </div>
              <div className="BackToBlogs">
                <Link href="/blogs">
                  <a className="BackBtn">Back to blogs</a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

export default Blog;
