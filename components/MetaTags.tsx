import React from "react";

interface Props {
  title?: string;
  description?: string;
  image?: {
    url: string;
    alt?: string;
    width?: string | number;
    height?: string | number;
  };
}

const MetaTags = (props: Props) => {
  return (
    <>
      <meta property="og:site_name" content="CluCoin" />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="en" />
      <meta property="og:url" content="https://www.clucoin.com/" />
      <meta name="theme-color" content="#ef008e" />
      <meta
        name="description"
        content="CluCoin is a deflationary smart token with a long term charity focus and vision."
      />

      {props.title && <meta property="og:title" content={props.title} />}
      {props.description && (
        <meta property="og:description" content={props.description} />
      )}

      {props.image && (
        <>
          <meta property="og:image" content={props.image.url} />
          {props.image.width && (
            <meta
              property="og:image:width"
              content={props.image.width.toString()}
            />
          )}
          {props.image.height && (
            <meta
              property="og:image:height"
              content={props.image.height.toString()}
            />
          )}
          {props.image.alt && (
            <meta property="og:image:alt" content={props.image.alt} />
          )}
        </>
      )}

      <meta name="twitter:site" content="@Clucoin" />
      <meta name="twitter:creator" content="@Clucoin" />
      <meta name="twitter:card" content="summary_large_image" />

      {props.description && (
        <meta name="twitter:description" content={props.description} />
      )}
      {props.title && <meta name="twitter:title" content={props.title} />}
      {props.image && (
        <>
          <meta name="twitter:image" content={props.image.url} />
          <meta name="twitter:image:alt" color={props.image.alt} />
        </>
      )}
    </>
  );
};

export default MetaTags;
