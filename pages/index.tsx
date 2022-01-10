import Image from "next/image";
import React, { useState, useRef } from "react";
import AnalyticCard from "../components/AnalyticCard";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import {
  faDiscord,
  faFacebookF,
  faInstagram,
  faRedditAlien,
  faTelegramPlane,
  faTiktok,
  faTwitter,
  faYoutube,
  faTwitch,
} from "@fortawesome/free-brands-svg-icons";
import Partner from "../components/Partner";
import RoadMapController from "../controllers/RoadMapController";
import { useCLUData } from "../hooks/useCLUData";
import { useHolderCMS } from "../hooks/useHolderCMS";
import Link from "next/link";
import Head from "next/head";
import MetaTags from "../components/MetaTags";

const images = ["Hold.png", "Clummunity.png", "Pool.png"];

export default function Home() {
  const [imageIndex, setImageIndex] = useState(0);
  const [data, isLoading] = useCLUData();
  const [holder, isLoaded] = useHolderCMS();
  const videoHeaderRef = useRef();

  return (
    <>
      <Head>
        <title>CLUCoin - Home </title>
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
      <header className="Header">
        <video
          ref={videoHeaderRef}
          width="100%"
          height="100%"
          autoPlay
          loop
          muted
        >
          <source src="assets/headeranimation.webm" type="video/webm" />
        </video>
        <a href="#Hero" className="DownBtn" title="Go Down">
          <FontAwesomeIcon icon={faChevronDown} />
        </a>
      </header>

      <div className="Container">
        {/* ANALYTICS */}
        <div className="HomeAnalytics">
          <AnalyticCard
            loading={isLoading}
            title={"Current Price"}
            data={data?.price.pcs.usd}
          />
          <AnalyticCard
            loading={isLoaded}
            title={"Holders"}
            data={holder?.number.toLocaleString("en-US", {
              maximumFractionDigits: 0,
            })}
          />
          <AnalyticCard
            title={"Supply"}
            loading={isLoading}
            data={data?.supply.toLocaleString("en-US", {
              maximumFractionDigits: 0,
            })}
          />
          <AnalyticCard
            loading={isLoading}
            title={"Market Cap"}
            data={data?.market_cap.toLocaleString("en-US", {
              maximumFractionDigits: 0,
            })}
          />
        </div>
        {/* ANALYTICS END */}

        {/* HERO */}
        <div className="Hero" id="Hero">
          <h1 className="HeroTitle">Together we can change the world</h1>
          <p className="HeroDescription">
            Hyper Deflationary Token with Smart Staking System. Hold, earn and
            help others in need.
          </p>
          <div className="HeroButtons">
            <Link href="/howtobuy" passHref>
              <span className="HeroButton BuyBtn">How to buy</span>
            </Link>
            <a
              href="https://poocoin.app/tokens/0x1162e2efce13f99ed259ffc24d99108aaa0ce935"
              className="HeroButton ChartBtn"
            >
              Live Chart
            </a>
            <Link href="/whitepaper" passHref>
              <span className="HeroButton WhitePaperBtn">White paper</span>
            </Link>
          </div>
          <ul className="SocialNav">
            <li className="SocialList">
              <a
                href="https://facebook.com/clucoin"
                target="_blank"
                rel="noopener noreferrer"
                role="button"
                title="Facebook"
              >
                <FontAwesomeIcon
                  icon={faFacebookF}
                  width={26}
                  className="social-item"
                />
              </a>
            </li>
            <li className="SocialList">
              <a
                href="https://www.youtube.com/channel/UCkdsLTJQWjB6eRSDYEeqhDQ"
                target="_blank"
                rel="noopener noreferrer"
                role="button"
                title="Youtube"
              >
                <FontAwesomeIcon icon={faYoutube} className="social-item" />
              </a>
            </li>
            <li className="SocialList">
              <a
                href="https://instagram.com/clucoin"
                target="_blank"
                rel="noopener noreferrer"
                role="button"
                title="Instagram"
              >
                <FontAwesomeIcon icon={faInstagram} className="social-item" />
              </a>
            </li>
            <li className="SocialList">
              <a
                href="https://www.twitch.tv/clucoin"
                target="_blank"
                rel="noopener noreferrer"
                role="button"
                title="Twitch"
              >
                <FontAwesomeIcon icon={faTwitch} className="social-item" />
              </a>
            </li>
            <li className="SocialList">
              <a
                href="https://twitter.com/clucoin"
                target="_blank"
                rel="noopener noreferrer"
                role="button"
                title="Twitter"
              >
                <FontAwesomeIcon icon={faTwitter} className="social-item" />
              </a>
            </li>
            <li className="SocialList">
              <a
                href="https://tiktok.com/@clucoin"
                target="_blank"
                rel="noopener noreferrer"
                role="button"
                title="Tiktok"
              >
                <FontAwesomeIcon icon={faTiktok} className="social-item" />
              </a>
            </li>
            <li className="SocialList">
              <a
                href="https://reddit.com/r/clucoin"
                target="_blank"
                rel="noopener noreferrer"
                role="button"
                title="Reddit"
              >
                <FontAwesomeIcon icon={faRedditAlien} className="social-item" />
              </a>
            </li>
            <li className="SocialList">
              <a
                href="https://discord.gg/clu"
                target="_blank"
                rel="noopener noreferrer"
                role="button"
                title="Discord"
              >
                <FontAwesomeIcon icon={faDiscord} className="social-item" />
              </a>
            </li>
            <li className="SocialList">
              <a
                href="https://t.me/clucoin"
                target="_blank"
                rel="noopener noreferrer"
                role="button"
                title="Telegram"
              >
                <FontAwesomeIcon
                  icon={faTelegramPlane}
                  className="social-item"
                />
              </a>
            </li>
          </ul>
        </div>
        {/* HERO END */}

        {/* OUR ATTRIBUTES */}
        <div className="OurAttributes">
          <p className="AttributesIntroduction">
            CluCoin is the first token designed with the users and a charity
            system built straight into its core.
            <br />
            We&#39;ve built a system designed to protect against whales,
            encourage holding and help charities around the world.
          </p>
          <div className="AttributesFlex">
            <div className="MobileAttribues">
              <Image
                src={`/assets/${images[imageIndex]}`}
                className="AttributeChangingImage"
                alt="Clucoin Attributes"
                width="566"
                height="387"
              />
            </div>

            <div className="AttributesBoxes">
              <div className="AttributeBox">
                <div className="AttributeImage">
                  <Image
                    src={`/assets/${images[0]}`}
                    className="AttributeChangingImage"
                    alt="Clucoin Attributes"
                    width="566"
                    height="387"
                  />
                </div>
                <div
                  className={`Box ${imageIndex === 0 ? "SpecialBox" : ""}`}
                  change-img="assets/Hold.svg"
                  onClick={() => setImageIndex(0)}
                >
                  <p className="BoxTitle">Hold and earn</p>
                  <p className="BoxDescription">
                    CluCoin rewards its holders through reflections, which is a
                    percentage taken out of every transaction redistributed to
                    every holder.
                  </p>
                </div>
              </div>

              <div className="AttributeBox">
                <div className="AttributeImage">
                  <Image
                    src={`/assets/${images[1]}`}
                    className="AttributeChangingImage"
                    alt="Clucoin Attributes"
                    width="566"
                    height="387"
                  />
                </div>
                <div
                  className={`Box ${imageIndex === 1 ? "SpecialBox" : ""}`}
                  change-img="assets/CluCommunity.svg"
                  onClick={() => setImageIndex(1)}
                >
                  <p className="BoxTitle">Clummunity</p>
                  <p className="BoxDescription">
                    CluCoin is focused on expanding its fast growing community
                    through hosting events, gamification, NFT rewards, and more.
                  </p>
                </div>
              </div>

              <div className="AttributeBox">
                <div className="AttributeImage">
                  <Image
                    src={`/assets/${images[2]}`}
                    className="AttributeChangingImage"
                    alt="Clucoin Attributes"
                    width="566"
                    height="387"
                  />
                </div>
                <div
                  className={`Box ${imageIndex === 2 ? "SpecialBox" : ""}`}
                  change-img="assets/Pool.svg"
                  onClick={() => setImageIndex(2)}
                >
                  <p className="BoxTitle">Hyper-deflationary burn</p>
                  <p className="BoxDescription">
                    The burn wallet gains a percentage from every transaction,
                    which reduces the circulating supply.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* OUR ATTRIBUTES END */}
      </div>

      {/* OUR PARTNERS */}
      <div className="Partners">
        <Partner
          src="/assets/coinmarketcap.svg"
          className="PartnerLogo CoinMarketCap"
          alt="CoinMarketCap"
          width="205"
          height="36"
          href="https://coinmarketcap.com/currencies/clucoin/"
        />
        <Partner
          src="/assets/coingecko.png"
          className="PartnerLogo Coingecko"
          alt="Coingecko"
          href="https://www.coingecko.com/en/coins/clucoin"
          width="165"
          height="40"
        />
        <Partner
          src="/assets/certik.svg"
          className="PartnerLogo Certik"
          href="https://www.certik.org/projects/clucoin"
          alt="Certik"
          width="165"
          height="40"
        />
        <Partner
          src="/assets/bscscan.png"
          className="PartnerLogo BscScan"
          href="https://bscscan.com/token/0x1162e2efce13f99ed259ffc24d99108aaa0ce935"
          alt="BscScan"
          width="165"
          height="42"
        />
        <Partner
          src="/assets/bitmart.png"
          className="PartnerLogo Bitmart"
          href="https://www.bitmart.com/en?r=CLU"
          alt="Bitmart"
          width="165"
          height="40"
        />
        <Partner
          href="https://blockfolio.com"
          src="/assets/blockfolio.svg"
          className="PartnerLogo"
          alt="blockfolio"
          width={165}
          height={76}
        />
        <Partner
          href="https://blockfolio.com"
          src="/assets/zbg.svg"
          className="PartnerLogo"
          alt="zbg"
          width={165}
          height={35}
        />
      </div>
      {/* OUR PARTNERS END */}

      <div className="Container">
        <h2 className="RoadMapTitle">Roadmap</h2>
        <RoadMapController />
      </div>

      <div className="BuyReminder">
        <div className="BuyReminderButtons">
          <Link href="/howtobuy" passHref>
            <span className="BuyReminderButton BuyBtn">How to buy</span>
          </Link>
          <a
            href="https://poocoin.app/tokens/0x1162e2efce13f99ed259ffc24d99108aaa0ce935"
            className="BuyReminderButton ChartBtn"
            target="_blank"
            rel="noreferrer"
          >
            Live Chart
          </a>
          <Link href="/whitepaper" passHref>
            <span className="BuyReminderButton WhitePaperBtn">Whitepaper</span>
          </Link>
        </div>
      </div>

      <div className="Container">
        <h2 className="OurTeamTitle">Our Team</h2>
        <div className="OurTeam">
          <div className="TeamMember">
            <div className="TeamMemberHeader DnpProfile"></div>
            <div className="TeamMemberDescription">
              <p className="MemberTitle">Austin, DNP3</p>
              <p className="MemberDescription">Founder and CEO</p>
            </div>
          </div>
          <div className="TeamMember">
            <div className="TeamMemberHeader DogProfile"></div>
            <div className="TeamMemberDescription">
              <p className="MemberTitle">DogGodFrogLog</p>
              <p className="MemberDescription">COO</p>
            </div>
          </div>
          <div className="TeamMember">
            <div className="TeamMemberHeader PogoProfile"></div>
            <div className="TeamMemberDescription">
              <p className="MemberTitle">Pogo</p>
              <p className="MemberDescription">CTO</p>
            </div>
          </div>
          <div className="TeamMember">
            <div className="TeamMemberHeader MattProfile"></div>
            <div className="TeamMemberDescription">
              <p className="MemberTitle">Matt Rolin</p>
              <p className="MemberDescription">Marketing Director</p>
            </div>
          </div>
          <div className="TeamMember">
            <div className="TeamMemberHeader DrewProfile"></div>
            <div className="TeamMemberDescription">
              <p className="MemberTitle">Drew Keith</p>
              <p className="MemberDescription">Creative Director</p>
            </div>
          </div>
          <div className="TeamMember">
            <div className="TeamMemberHeader SylteProfile"></div>
            <div className="TeamMemberDescription">
              <p className="MemberTitle">Sylte</p>
              <p className="MemberDescription">Dev Project Manager</p>
            </div>
          </div>
          <div className="TeamMember">
            <div className="TeamMemberHeader JennehProfile"></div>
            <div className="TeamMemberDescription">
              <p className="MemberTitle">Jenneh</p>
              <p className="MemberDescription">Social Media Manager</p>
            </div>
          </div>
          <div className="TeamMember">
            <div className="TeamMemberHeader FortiganProfile"></div>
            <div className="TeamMemberDescription">
              <p className="MemberTitle">Fortigan</p>
              <p className="MemberDescription">Community Manager</p>
            </div>
          </div>
        </div>
      </div>

      {/* OUR PARTNERS */}
      <div className="Partners">
        <Partner
          href="https://www.newsweek.com/clucoin-cryptocurrency-charity-donations-dnp3-speculation-investment-risk-1593208"
          src="/assets/newsweek.png"
          className="PartnerLogo Newsweek"
          alt="Newsweek"
          width="205"
          height="36"
        />
        <Partner
          href="https://www.benzinga.com/markets/cryptocurrency/21/05/21221440/the-next-safemoon-new-crypto-token-clucoin-surges-1000-on-day-one"
          src="/assets/bitcoinnews.png"
          className="PartnerLogo BitcoinNews"
          alt="Bitcoin News"
          width="111"
          height="80"
        />
        <Partner
          href="https://www.livebitcoinnews.com/new-charity-token-clucoin-enters-the-crypto-foray/"
          src="/assets/Benzinga.svg"
          className="PartnerLogo Benzinga"
          alt="Benzinga"
          width="165"
          height="80"
        />
        <Partner
          href="https://cryptomode.com/clucoin-passes-certik-audit-with-flying-colors-clu-usdt-begins-to-recover/"
          src="/assets/cryptomode.png"
          className="PartnerLogo Cryptomode"
          alt="Cryptomode"
          width="165"
          height="60"
        />
      </div>
      {/* OUR PARTNERS END */}
    </>
  );
}
