import React from "react";
import dynamic from "next/dynamic";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Charity } from "../types";
import { useDialog } from "../stores/useDialog";
import { CLUPANEL_API_URL } from "../constants";

interface Props {
  charity: Charity;
}

const Markdown = dynamic(import("./Markdown"), { ssr: false });

const CharityModal = ({ charity }: Props) => {
  const { setDialog } = useDialog();

  return (
    <>
      <div className="CharityModalBox">
        <div className="CharityModal">
          <button className="CloseModal" onClick={() => setDialog(null)}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <div className="CharityModalHeader">
            <img
              src={`https://cdn.clucoin.com/${charity.image.hash}${charity.image.ext}`}
              alt={charity.name}
            />
          </div>
          <div className="CharityModalBody">
            <div className="CharityBodyTitle">
              <p className="CharityTitle">{charity.name}</p>
            </div>
            <div className="CharityDescription">
              <Markdown>{charity.vision}</Markdown>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CharityModal;
