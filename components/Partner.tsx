import Image, { ImageProps } from "next/image";
import React from "react";

type Props = ImageProps & { href?: string };

const Partner = ({ href, ...props }: Props) => {
  return (
    <a className="Partner" target="_blank" rel="noreferrer" href={href}>
      <Image alt="" {...props} />
    </a>
  );
};

export default Partner;
