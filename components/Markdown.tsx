import React, { useEffect, useState } from "react";

import { remark } from "remark";
import remarkHtml from "remark-html";

interface Props {
  children: any;
}

const Markdown = ({ children }: Props) => {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: remark().use(remarkHtml).processSync(children).value.toString(),
      }}
      className="markdown"
    ></div>
  );
};

export default Markdown;
