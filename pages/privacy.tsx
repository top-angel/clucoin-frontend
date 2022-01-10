import Head from "next/head";
import Image from "next/image";

export default function Privacy() {
  return (
    <>
      <Head>
        <title>CluCoin - Privacy Policy</title>
      </Head>
      <div className="Container">
        <div className="TermsBox">
          <div className="TermsHeader">
            <Image
              src="/assets/clulogo.svg"
              alt="Clucoin"
              width="185"
              height="185"
            />
            <h1 className="TitleTerms">Privacy Policy</h1>
          </div>

          <h5 className="text-muted mb-2">Last Updated: 05/02/2021</h5>
          <p>
            We CluCoin (clucoin.com), are committed to protecting any data that
            we collect concerning you. By using our services you agree to the
            use of the data that we collect in accordance with this Privacy
            Policy.
          </p>
          <p>We are committed to protecting your privacy.</p>
          <p>
            We collect the minimum amount of information about you that is
            commensurate with providing you with a satisfactory service. This
            Policy indicates the type of processes that may result in data being
            collected about you. The purpose of this Privacy Policy to enable
            you to understand which personal identifying information
            (&#34;PI&#34;, &#34;Personal Information&#34;) of yours is
            collected, how and when we might use your information, who has
            access to this information, and how you can correct any inaccuracies
            in the information. To better protect your privacy, we provide this
            notice explaining our online information practices and the choices
            you can make about the way your information is collected and used.
            To make this notice easy to find, we make it available on our
            website.
          </p>
          <h3 className="text-white mt-2">Information Collected</h3>
          <p>
            We may collect any or all of the information that via both automated
            means such as communications profiles and cookies. Personal
            Information you give us depends on the type of service, support, or
            sale inquiry, and may include your name, address, telephone number,
            fax number and email address, dates of service provided, types of
            service provided, payment history, manner of payment, amount of
            payments, date of payments, domain name or other payment
            information. All sensitive information is collected on a secure
            server and data is transferred . When transferring personal
            information a security icon will appear in your browser.
          </p>
          <h3 className="text-white mt-2">Information Use</h3>
          <p>
            This information is used for billing and to provide service and
            support to our customers. We may also study this information to
            determine our customers needs and provide support for our customers.
            All reasonable precautions are taken to prevent unauthorized access
            to this information. This safeguard may require you to provide
            additional forms of identity should you wish to obtain information
            about your account details. RunePay may email its monthly newsletter
            to the primary contact e-mail on file, but customers are able to opt
            out of this newsletter at any time.
          </p>
          <p>
            We use IP addresses to analyze trends, administer our site and
            servers, track access, and gather broad demographic information for
            aggregate use. IP addresses are not linked to personally
            identifiable information. It is possible that personal information
            about a customer may be included in the log files due to the normal
            functions of IP addresses and SaaS applications.
          </p>
          <h3 className="text-white mt-2">Cookies</h3>
          <p>
            Your Internet browser has the in-built facility for storing small
            text files - &#34;cookies&#34; - that hold information which allows
            a website to recognize your account. We use cookies to save your
            preferences and login information, and provide personalized
            functionality. You can reject cookies by changing your browser
            settings, but be aware that this will disable some of the
            functionality on the CluCoin website. More information about cookies
            can be found at{" "}
            <a
              href="https://en.wikipedia.org/wiki/HTTP_cookie"
              className="text-info"
            >
              https://en.wikipedia.org/wiki/HTTP_cookie
            </a>
            .
          </p>
        </div>
      </div>
    </>
  );
}
