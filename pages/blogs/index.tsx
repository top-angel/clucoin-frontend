import axios from "axios";
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import Link from "next/link";
import Head from "next/head";
import dynamic from "next/dynamic";

import { BlogPost } from "../../types";
import { CLUPANEL_API_URL } from "../../constants";
import MetaTags from "../../components/MetaTags";

const Markdown = dynamic(import("../../components/Markdown"), { ssr: false });

type Props = {
  blogs: BlogPost[];
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const data = await axios
    .get<BlogPost[]>(CLUPANEL_API_URL + "/blogs?_sort=date:desc")
    .then((res) => res.data);

  return {
    props: {
      blogs: data,
    },
  };
};

const Blogs: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> =
  ({ blogs }) => {
    return (
      <>
        <Head>
          <title>Blogs Page</title>
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
          <div className="BlogsBody">
            <div className="BlogsHeader">
              <h1 className="BlogsTitle">Blog</h1>
              <p className="BlogsDescription">
                CLU news, updates, and interesting stories.
              </p>
            </div>
            {blogs.length ? (
              <div className="BlogsPosted">
                {blogs.slice(0, 2).map((post) => (
                  <Link href={`/blogs/${post.slug}`} passHref key={post.id}>
                    <a className="Blog BlogLarge">
                      <div className="BlogImage">
                        <img
                          src={`https://cdn.clucoin.com/${post.image.hash}${post.image.ext}`}
                          alt={post.title}
                        />
                      </div>
                      <div className="BlogDescription">
                        <p className="BlogTitle">{post.title}</p>
                        <p className="BlogAboutDescription">
                          <Markdown>
                            {post.description.slice(0, 150) + "..."}
                          </Markdown>
                        </p>
                        <p className="BlogPostedDate">
                          {new Date(post.date).toDateString()}
                        </p>
                      </div>
                    </a>
                  </Link>
                ))}
                {blogs.slice(2).map((post) => (
                  <Link href={`/blogs/${post.slug}`} passHref key={post.id}>
                    <a className="Blog">
                      <div className="BlogImage">
                        <img
                          src={`https://cdn.clucoin.com/${post.image.hash}${post.image.ext}`}
                          alt={post.title}
                        />
                      </div>
                      <div className="BlogDescription">
                        <p className="BlogTitle">{post.title}</p>
                        <p className="BlogAboutDescription">
                          <Markdown>
                            {post.description.slice(0, 150) + "..."}
                          </Markdown>
                        </p>
                        <p className="BlogPostedDate">
                          {new Date(post.date).toDateString()}
                        </p>
                      </div>
                    </a>
                  </Link>
                ))}
              </div>
            ) : (
              <p style={{ textAlign: "center" }}>
                There are no blog posts at the moment, come back later
              </p>
            )}
          </div>
        </div>
      </>
    );
  };

export default Blogs;
