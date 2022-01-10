import React, { useRef, useState } from "react";
import DownArrow from "../icons/DownArrow";
import Dropdown from "./Dropdown";

interface Props {
  title: string;
}

const NavbarDropdown: React.FC<Props> = ({ title, children }) => {
  const ref = useRef();
  const [show, setShow] = useState(false);

  return (
    <Dropdown
      handler={(e) => {
        if (!ref.current) return;

        if (!(ref.current as any).contains(e.target)) {
          setShow(false);
        }
      }}
    >
      <div className="NavigationSubList NavigationDrop" ref={ref}>
        <div className="NavigationDropTitle" onClick={() => setShow(!show)}>
          <span >{title}</span>
          <DownArrow
            fill="white"
            width={12}
            height={12}
            className={`${show}_state`}
            onClick={() => setShow(!show)}
          />
        </div>
        {show && children}
      </div>
    </Dropdown>
  );
};

export default NavbarDropdown;
