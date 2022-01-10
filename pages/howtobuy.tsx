import React, { useEffect, useRef, useState } from "react";
import Head from "next/head";
import MetaTags from "../components/MetaTags";

const HowToBuy = () => {
  const htbVideo = useRef<HTMLVideoElement>();
  const [isPlaying, setIsPlaying] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    if (!htbVideo.current) return;
    htbVideo.current.volume = 0.15;
  }, []);

  function videoPausePlay() {
    if (!htbVideo.current) return;

    if (htbVideo.current.paused) {
      setIsPlaying(true);
      htbVideo.current.play();
    } else {
      setIsPlaying(false);
      htbVideo.current.pause();
    }
  }

  // function copyClipboard() {
  //   navigator.clipboard
  //     .writeText("0x1162e2efce13f99ed259ffc24d99108aaa0ce935")
  //     .catch((err) => {
  //       console.log("Something went wrong", err);
  //     });
  // }

  return (
    <>
      <Head>
        <title>CluCoin - How to buy</title>
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
        <div className="HowToBuy">
          <video
            className={`HtbVideo${isPlaying ? " Running" : " Paused"}`}
            poster="assets/htb-thumbnail.webp"
            src="assets/videos/howtobuy.mp4"
            id="htb-video"
            onClick={videoPausePlay}
            ref={htbVideo}
          ></video>
          <h1 className="Title">
            How to buy <span>clucoin</span>
          </h1>
          <div className="BuyTabs">
            <button
              className={`${tabIndex === 0 ? "ActiveTab" : ""}`}
              onClick={() => setTabIndex(0)}
            >
              TrustWallet
            </button>
            <button
              className={`${tabIndex === 1 ? "ActiveTab" : ""}`}
              onClick={() => setTabIndex(1)}
            >
              MetaMask
            </button>
            <button
              className={`${tabIndex === 2 ? "ActiveTab" : ""}`}
              onClick={() => setTabIndex(2)}
            >
              PC
            </button>
          </div>
          <div className={`TabBuy ${tabIndex === 0 ? "TabBuyShow" : ""}`}>
            <div className="BuyBody">
              <ol className="BuyOrderedList">
                <li className="BuyList">
                  <p>
                    Acquire
                    <span className="Badge">BNB</span>
                    by using the
                    <span className="HighlightText"> “Buy” </span>
                    option in TrustWallet, or transfer
                    <span className="Badge">BNB</span>
                    from another location such as an exchange into your
                    TrustWallet account.
                    <br />
                    <br />
                    <i>
                      Select <span className="HighlightText">BNB</span> from the
                      list of crypto that you own, choose the “More” option, and
                      then choose “
                      <span className="HighlightText">Swap to Smart Chain</span>
                      ”. Be sure not to select the 100% option as it will not
                      leave enough <span className="HighlightText">BNB</span> to
                      cover the fee to swap. Simply choose a lesser amount,
                      enough to cover the fee, and then select “
                      <span className="HighlightText">Swap</span>”.
                    </i>
                  </p>
                </li>
                <li className="BuyList">
                  <p>
                    Go back to the screen with the list of crypto that you own
                    and you will see “
                    <span className="HighlightText">Smart Chain</span>”.
                  </p>
                </li>
                <li className="BuyList">
                  <p>
                    Now open a web browser and navigate to the{" "}
                    <a className={`Badge`} href="https://swap.clucoin.com">
                      {" "}
                      swap.clucoin.com
                    </a>{" "}
                    website.
                  </p>
                </li>
                <li className="BuyList">
                  <p>
                    Click on “<span className="HighlightText">Connect</span>”
                    and then “
                    <span className="HighlightText">WalletConnect</span>”.
                  </p>
                </li>
                <li className="BuyList">
                  <p>
                    Choose the TrustWallet option and follow the steps to
                    authorize.
                  </p>
                </li>
                <li className="BuyList">
                  <p>
                    Once you have authorized in TrustWallet, head back over to
                    the web browser where you should still be on{" "}
                    <a
                      href="https://swap.clucoin.com"
                      className="HighlightText"
                    >
                      swap.clucoin.com
                    </a>
                    .
                  </p>
                </li>
                <li className="BuyList">
                  <p>
                    Go to the settings option and change the slippage setting to{" "}
                    <span className="HighlightText">12%</span>.
                    <br />
                    <br />
                    <i>
                      Choose how much <span className="HighlightText">CLU</span>{" "}
                      you would like to purchase while leaving enough BNB for
                      fees, and select “Swap” then click “Confirm Swap”. You
                      will be guided back to TrustWallet where you will need to
                      click “Send”.
                    </i>
                  </p>
                </li>
                <li className="BuyList">
                  <p>
                    Now head back over to TrustWallet and click “Cancel”, then
                    go back to the “Wallet” section.
                    <br />
                    <br />
                    <i>
                      Go to the settings button in the top right and search for{" "}
                      <span className="HighlightText">CLU</span>. Toggle the
                      option to enable{" "}
                      <span className="HighlightText">CLU</span> in your wallet.
                      If <span className="HighlightText">CLU</span> doesn&#39;t
                      show up in the search, click the &#34;Add Custom
                      Token&#34; option, enter in the{" "}
                      <span className="HighlightText">CLU</span> contract
                      address and click &#34;Save&#34;.
                    </i>
                  </p>
                </li>
                <li className="BuyList">
                  <p>
                    You should now see the <span className="Badge">CLU</span>{" "}
                    that you purchased in your wallet.
                  </p>
                </li>
              </ol>
            </div>
          </div>
          <div className={`TabBuy ${tabIndex === 1 ? "TabBuyShow" : ""}`}>
            <div className="BuyBody">
              <ol className="BuyOrderedList">
                <li className="BuyList">
                  <p>
                    Add support for BSC (Binance Smart Chain) in MetaMask by
                    following this tutorial:
                    <br />
                    <a
                      className={`Badge`}
                      target="blank"
                      href="https://academy.binance.com/en/articles/connecting-metamask-to-binance-smart-chain"
                      style={{ marginTop: "5px", display: "inline-block" }}
                    >
                      Click for the tutorial
                    </a>
                  </p>
                </li>
                <li className="BuyList">
                  <p>
                    Acquire BNB (Binance Coin) from an exchange or another app
                    and send it to your wallet. You are ready to proceed with
                    your purchase.
                  </p>
                </li>
                <li className="BuyList">
                  <p>
                    Go to the menu and select “Browser”.
                    <br />
                    Navigate to the{" "}
                    <a className={`Badge`} href="https://swap.clucoin.com">
                      {" "}
                      swap.clucoin.com
                    </a>
                  </p>
                </li>
                <li className="BuyList">
                  <p>
                    Click on “<span className="HighlightText">Connect</span>”
                    and then “<span className="HighlightText">MetaMask</span>”.
                  </p>
                </li>
                <li className="BuyList">
                  <p>
                    Go to the settings option and change the slippage setting to{" "}
                    <span className="HighlightText">12%</span>.
                    <br />
                    <br />
                    <i>
                      Choose how much CLU you would like to purchase while
                      leaving enough BNB for fees, and select “Swap”.
                    </i>
                  </p>
                </li>
                <li className="BuyList">
                  <p>
                    Now head back over to the “Wallet” section in MetaMask.
                    <br />
                    <br />
                    <i>
                      To be able to view your CLU in MetaMask you need to click
                      “Add Tokens. Enter in the CLU contract address and click
                      “Add Token”.
                    </i>
                  </p>
                </li>
                <li className="BuyList">
                  <p>
                    You should now see the <span className="Badge">CLU</span>{" "}
                    that you purchased in your wallet.
                  </p>
                </li>
              </ol>
            </div>
          </div>
          <div className={`TabBuy ${tabIndex === 2 ? "TabBuyShow" : ""}`}>
            <div className="BuyBody">
              <ol className="BuyOrderedList">
                <li className="BuyList">
                  <p>
                    Add the MetaMask extension to either the Chrome, Firefox,
                    Brave, or Edge browser.
                    <br />
                    Import your existing wallet or create a new wallet.
                  </p>
                </li>
                <li className="BuyList">
                  <p>
                    Add support for BSC (Binance Smart Chain) in MetaMask by
                    following this tutorial:
                    <br />
                    <a
                      className={`Badge`}
                      target="blank"
                      href="https://academy.binance.com/en/articles/connecting-metamask-to-binance-smart-chain"
                      style={{ marginTop: "5px", display: "inline-block" }}
                    >
                      Click for the tutorial
                    </a>
                  </p>
                </li>
                <li className="BuyList">
                  <p>
                    Acquire BNB (Binance Coin) from an exchange or another app
                    and send it to your wallet.
                  </p>
                </li>
                <li className="BuyList">
                  <p>
                    Navigate to the{" "}
                    <a className={`Badge`} href="https://swap.clucoin.com">
                      {" "}
                      swap.clucoin.com
                    </a>
                  </p>
                </li>
                <li className="BuyList">
                  <p>
                    Click on “<span className="HighlightText">Connect</span>”
                    and then “<span className="HighlightText">MetaMask</span>”.
                  </p>
                </li>
                <li className="BuyList">
                  <p>
                    Click on “<span className="HighlightText">Connect</span>”
                    and then approve the connection in the{" "}
                    <span className="HighlightText">MetaMask</span> pop-up.
                  </p>
                </li>
                <li className="BuyList">
                  <p>
                    Go to the settings option and change the slippage setting to{" "}
                    <span className="HighlightText">12%</span>.
                  </p>
                </li>
                <li className="BuyList">
                  <p>
                    Choose how much <span className="Badge">CLU</span> you would
                    like to purchase while leaving enough BNB for fees, and
                    select “Swap”.
                    <br />
                    <br />
                    <i>
                      To be able to view your CLU in MetaMask you need to click
                      “Assets” and then “Add Token”. Enter in the CLU contract
                      address and click “Next”.
                    </i>
                  </p>
                </li>
                <li className="BuyList">
                  <p>
                    Head back over to the “Assets” section and you should now
                    see the CLU that you purchased.
                  </p>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HowToBuy;
