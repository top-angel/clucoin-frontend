import {
  faBars,
  faChevronDown,
  faChevronUp,
  faTimes,
  faCalendar,
  faChartBar,
  faPaperPlane,
  faHeart,
  faQuestionCircle,
  faStickyNote,
  faUser,
  faWallet,
  faCog,
  faSignOutAlt,
  faClipboardCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios, { AxiosError } from "axios";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";
import { AUTH_URI } from "../constants";
import { useAuth } from "../hooks/useAuth";
import { useDialog } from "../stores/useDialog";
import { useUser } from "../stores/useUser";
import {
  connectorImages,
  ConnectorNames,
  connectorsByName,
} from "../utils/web3";
import Dropdown from "./Dropdown";
import SignUpModal from "./SignUpModal";
import { ios } from "platform-detect";
import NavbarDropdown from "./NavbarDropdown";

const Header = () => {
  const isLoggingIn = useRef(false);
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const [openedMenuIndex, setOpenMenuIndex] = useState([]);
  const [showSignInMessage, setShowSignInMessage] = useState(false);

  const [, setCookies] = useCookies();
  const fetchUser = useUser((s) => s.fetchUser);
  const setToken = useUser((s) => s.updateToken);

  const user = useUser((s) => s.user);
  const { login, logout, sign, account, library } = useAuth();
  const setDialog = useDialog((s) => s.setDialog);
  const dropdownRef = useRef();
  const [dropdown, setDropdown] = useState(null);

  const signMessage = () => {
    const message = `CLUCOIN - ${account} @ ${new Date().getTime()}`;
    sign(message)
      .then((sig) => {
        axios
          .post(AUTH_URI + "/v1/connect", {
            msg: message,
            signature: sig,
            address: account,
          })
          .then((res) => {
            setCookies("token", res.data.token, {
              path: "/",
              sameSite: "lax",
            });
            setToken(res.data.token);
            fetchUser();
            setShowSignInMessage(false);
          })
          .catch((err: AxiosError) => {
            if (err.response?.status == 420) {
              setDialog(<SignUpModal message={message} signature={sig} />);
            }
          });
      })
      .catch(() => {
        toast.error("Please sign the verification message.");
      });
  };

  useEffect(() => {
    if (account && isLoggingIn.current) {
      if (ios) {
        setShowSignInMessage(true);
      } else {
        signMessage();
      }
    }
    // Memoizing signMessage had some funky issues on iOS, could probably be resolved with more work
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);

  const handleSidebarVisibility = () => {
    document.querySelector("body").classList.toggle("bodyOpened"); // TODO: fix this shit
    setSideBarOpen(!sideBarOpen);
  };

  const handleMenuOpen = (i: number) => {
    if (!openedMenuIndex.includes(i)) {
      setOpenMenuIndex([...openedMenuIndex, i]);
    } else {
      setOpenMenuIndex(openedMenuIndex.filter((j) => j != i));
    }
  };

  return (
    <>
      {showSignInMessage && (
        <div
          className={"SignInComplete"}
          style={{
            width: "100vw",
            height: "100vh",
            position: "fixed",
            backgroundColor: "#000000",
            zIndex: 10000000,
          }}
        >
          <div
            className={"SignInComplete_Box"}
            style={{
              width: "80%",
              height: "80%",
              position: "fixed",
              marginTop: "20%",
              marginLeft: "10%",
              marginRight: "10%",
              zIndex: 10000000,
            }}
          >
            <h1 className="modal-title">Signature Required</h1>
            <span className={"SignInComplete_Text"}>
              Please accept the signature request to complete the connection.
            </span>
            {ios && (
              <button
                style={{ marginTop: "50px" }}
                type="button"
                className="ConnectButton"
                id="ConnectButton"
                onClick={() => {
                  signMessage();
                  setShowSignInMessage(false);
                }}
              >
                Sign
              </button>
            )}
          </div>
        </div>
      )}
      <div className={"MobileSideBar" + (sideBarOpen ? " MenuToggled" : "")}>
        <button
          className="CloseSideBarButton"
          onClick={handleSidebarVisibility}
          aria-label="closeSidebar"
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <ul className="MobileSideBarNavigationList">
          <li className="NavigationSubList">
            <Link href="/quests" passHref>
              <a onClick={handleSidebarVisibility} className="NavigationLink">
                Quests
              </a>
            </Link>
          </li>
          <li className={`NavigationSubList`}>
            <a
              onClick={handleSidebarVisibility}
              href="https://swap.clucoin.com"
              className="NavigationLink"
            >
              Swap
            </a>
          </li>
          <li className={`NavigationSubList`}>
            <a
              onClick={handleSidebarVisibility}
              href="https://shop.clucoin.com"
              className="NavigationLink"
            >
              Merch
            </a>
          </li>
          <li className="NavigationSubList" id="ProfileMobile">
            <div
              className={`DropDownBox ${
                openedMenuIndex.includes(1) ? "DropDownActive" : ""
              }`}
            >
              <button
                type="button"
                className="DropDownToggleMenuBtn"
                onClick={() => handleMenuOpen(1)}
              >
                Resources
                <FontAwesomeIcon
                  icon={
                    openedMenuIndex.includes(1) ? faChevronUp : faChevronDown
                  }
                />
              </button>
              <ul className="DropDownMenu">
                <li className="DropDownList">
                  <a
                    href="https://claim.clucoin.com"
                    className="DropDownLink"
                    onClick={handleSidebarVisibility}
                  >
                    Claim
                  </a>
                </li>
                <li className="DropDownList">
                  <Link href="/roadmap" passHref>
                    <a
                      className="DropDownLink"
                      onClick={handleSidebarVisibility}
                    >
                      Roadmap
                    </a>
                  </Link>
                </li>
                <li className="DropDownList">
                  <Link href="/howtobuy" passHref>
                    <a
                      className="DropDownLink"
                      onClick={handleSidebarVisibility}
                    >
                      How to buy
                    </a>
                  </Link>
                </li>
                <li className="DropDownList">
                  <Link href="/whitepaper" passHref>
                    <a
                      className="DropDownLink"
                      onClick={handleSidebarVisibility}
                    >
                      White paper
                    </a>
                  </Link>
                </li>
              </ul>
            </div>
          </li>
          <li className="NavigationSubList" id="ProfileMobile">
            <div
              className={`DropDownBox ${
                openedMenuIndex.includes(2) ? "DropDownActive" : ""
              }`}
            >
              <button
                type="button"
                className="DropDownToggleMenuBtn"
                onClick={() => handleMenuOpen(2)}
              >
                Content
                <FontAwesomeIcon
                  icon={
                    openedMenuIndex.includes(2) ? faChevronUp : faChevronDown
                  }
                />
              </button>
              <ul className="DropDownMenu">
                <li className="DropDownList">
                  <Link href="/blogs" passHref>
                    <a
                      className="DropDownLink"
                      onClick={handleSidebarVisibility}
                    >
                      Blogs
                    </a>
                  </Link>
                </li>
                <li className="DropDownList">
                  <Link href="/events" passHref>
                    <a
                      className="DropDownLink"
                      onClick={handleSidebarVisibility}
                    >
                      Events
                    </a>
                  </Link>
                </li>
                <li className="DropDownList">
                  <Link href="/charity" passHref>
                    <a
                      className="DropDownLink"
                      onClick={handleSidebarVisibility}
                    >
                      Charity
                    </a>
                  </Link>
                </li>
              </ul>
            </div>
          </li>
          {user ? (
            <li className="NavigationSubList" id="ProfileMobile">
              <div
                className={`DropDownBox ${
                  openedMenuIndex.includes(0) ? "DropDownActive" : ""
                }`}
              >
                <button
                  type="button"
                  className="DropDownToggleMenuBtn"
                  onClick={() => handleMenuOpen(0)}
                >
                  Profile
                  <FontAwesomeIcon
                    icon={
                      openedMenuIndex.includes(0) ? faChevronUp : faChevronDown
                    }
                  />
                </button>
                <ul className="DropDownMenu">
                  <li className="DropDownList">
                    <Link href="/profile/@me" passHref>
                      <a
                        className="DropDownLink"
                        onClick={handleSidebarVisibility}
                      >
                        {user?.username}
                      </a>
                    </Link>
                  </li>
                  <li className="DropDownList">
                    <Link href="/wallet" passHref>
                      <a
                        className="DropDownLink"
                        onClick={handleSidebarVisibility}
                      >
                        Wallet
                      </a>
                    </Link>
                  </li>
                  <li className="DropDownList">
                    <Link href="/profile/settings" passHref>
                      <a
                        className="DropDownLink"
                        onClick={handleSidebarVisibility}
                      >
                        Settings
                      </a>
                    </Link>
                  </li>
                  <li className="DropDownList">
                    <p
                      onClick={() => {
                        logout();
                        handleSidebarVisibility();
                      }}
                      className="DropDownLink"
                    >
                      Logout
                    </p>
                  </li>
                </ul>
              </div>
            </li>
          ) : null}
          {!user ? (
            <li className="NavigationSubList">
              <button
                type="button"
                className="ConnectButton"
                id="ConnectButton"
                onClick={() => {
                  isLoggingIn.current = true;
                  login(ConnectorNames.WalletConnect);

                  handleSidebarVisibility();
                }}
              >
                Connect
              </button>
            </li>
          ) : null}
        </ul>
      </div>
      <nav className={`HeaderNavigation`}>
        <div className="Container">
          <div className="HeaderLogo">
            <Link href="/" passHref>
              <a>
                <Image
                  src="/assets/logo.svg"
                  className="Logo"
                  alt="CluCoin Logo"
                  width="178"
                  height="41"
                />
              </a>
            </Link>
          </div>
          <button
            className="OpenSideBarButton"
            onClick={handleSidebarVisibility}
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
          <div className="HeaderLinks">
            <ul className="HeaderNavigationList">
              <li className="NavigationSubList">
                <Link href="/quests" passHref>
                  <a className={`NavigationLink`}>Quests</a>
                </Link>
              </li>
              <li className="NavigationSubList">
                <a className={`NavigationLink`} href="https://swap.clucoin.com">
                  Swap
                </a>
              </li>
              <li className="NavigationSubList">
                <a className={`NavigationLink`} href="https://shop.clucoin.com">
                  Merch
                </a>
              </li>
              <NavbarDropdown title="Resources">
                <ul className="NavigationDropdown">
                  <li>
                    <a className="Link" href="https://claim.clucoin.com">
                      <FontAwesomeIcon icon={faClipboardCheck} /> Claim
                    </a>
                  </li>
                  <li>
                    <Link href="/roadmap">
                      <a className="Link">
                        <FontAwesomeIcon icon={faChartBar} /> Roadmap
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/howtobuy">
                      <a className="Link">
                        <FontAwesomeIcon icon={faQuestionCircle} /> How to buy
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/whitepaper">
                      <a className="Link">
                        <FontAwesomeIcon icon={faStickyNote} /> White paper
                      </a>
                    </Link>
                  </li>
                </ul>
              </NavbarDropdown>
              <NavbarDropdown title="Content">
                <ul className="NavigationDropdown">
                  <li>
                    <Link href="/blogs">
                      <a className="Link">
                        <FontAwesomeIcon icon={faPaperPlane} /> Blogs
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/events">
                      <a className="Link">
                        <FontAwesomeIcon icon={faCalendar} /> Events
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/charity">
                      <a className="Link">
                        <FontAwesomeIcon icon={faHeart} /> Charity
                      </a>
                    </Link>
                  </li>
                </ul>
              </NavbarDropdown>
            </ul>
          </div>
          <div className="HeaderProfile">
            <div className="ProfilePoints">
              <div className="user-dropdown" ref={dropdownRef}>
                <span
                  className="PointsButton"
                  onClick={() =>
                    setDropdown(
                      !dropdown ? (
                        user ? (
                          <div className="user-dropdown-content">
                            <Link href="/profile/@me" passHref>
                              <p onClick={() => setDropdown(null)}>
                                <FontAwesomeIcon icon={faUser} /> Profile
                              </p>
                            </Link>
                            <Link href="/wallet" passHref>
                              <p onClick={() => setDropdown(null)}>
                                <FontAwesomeIcon icon={faWallet} /> Wallet
                              </p>
                            </Link>
                            <Link href="/profile/settings" passHref>
                              <p onClick={() => setDropdown(null)}>
                                <FontAwesomeIcon icon={faCog} /> Settings
                              </p>
                            </Link>
                            <p
                              onClick={() => {
                                setDropdown(null);
                                logout();
                              }}
                            >
                              <FontAwesomeIcon icon={faSignOutAlt} />
                              Logout
                            </p>
                          </div>
                        ) : (
                          <div className="user-dropdown-content">
                            {Object.keys(connectorsByName).map(
                              (connector, i) => {
                                return (
                                  <div
                                    className="Connector"
                                    key={i}
                                    onClick={() => {
                                      isLoggingIn.current = true;
                                      login(connector as ConnectorNames);
                                      setDropdown(null);
                                    }}
                                  >
                                    <div className="ConnectorIcon">
                                      {
                                        connectorImages[
                                          connector as ConnectorNames
                                        ]
                                      }
                                    </div>
                                    <p className="ConnectorName">{connector}</p>
                                  </div>
                                );
                              }
                            )}
                          </div>
                        )
                      ) : null
                    )
                  }
                >
                  {!user ? "Connect" : user.username}
                </span>
                <Dropdown
                  handler={(e) => {
                    if (!dropdownRef.current) return;

                    if (!(dropdownRef.current as any).contains(e.target)) {
                      setDropdown(null);
                    }
                  }}
                >
                  {dropdown}
                </Dropdown>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
