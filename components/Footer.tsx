import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="Footer">
      <div className="Container">
        <div className="FooterFlex">
          <div className="FooterCol FCol1">
            <Image
              src="/assets/logo.svg"
              alt="Clucoin Logo"
              width="125"
              height="30"
            />
            <div className="Description">
              <p className="FooterDescription">
                Our model rewards holders and saves money for charity on every
                transaction. With each transaction 5% goes to liquidity pool and
                5% gets redistributed back to all CLU holders! You will earn CLU
                just for holding.
              </p>
            </div>
          </div>
          <div className="FooterCol FCol2">
            <p className="FooterTitle">Learn more</p>
            <div className="FooterNav">
              <ul className="FooterNavList">
                <li className="FooterList">
                  <Link href="/howtobuy" passHref>
                    <a className="FooterLink">How To Buy</a>
                  </Link>
                </li>
                <li className="FooterList">
                  <Link href="/whitepaper" passHref>
                    <a className="FooterLink">White Paper</a>
                  </Link>
                </li>
                <li className="FooterList">
                  <Link href="/roadmap" passHref>
                    <a className="FooterLink">Roadmap</a>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="FooterCol FCol3">
            <p className="FooterTitle">Team</p>
            <div className="FooterNav">
              <ul className="FooterNavList">
                <li className="FooterList">
                  <a
                    className="FooterLink"
                    href="https://www.twitter.com/dnpthree"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Creator
                  </a>
                </li>
                <li className="FooterList">
                  <a
                    className="FooterLink"
                    href="https://discord.gg/clu"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="FooterCol FCol4">
            <p className="FooterTitle">Legal</p>
            <div className="FooterNav">
              <ul className="FooterNavList">
                <li className="FooterList">
                  <Link href="/terms" passHref>
                    <span className="FooterLink">Terms & Conditions</span>
                  </Link>
                </li>
                <li className="FooterList">
                  <Link href="/privacy" passHref>
                    <span className="FooterLink">Privacy Policy</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <p className="CopyrightText">© CluCoin Inc - All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
