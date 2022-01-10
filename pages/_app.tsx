import { useEffect } from "react";
import { useRouter } from "next/router";

import Providers from "../providers";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useDialog } from "../stores/useDialog";
import LoadingBar from "../components/LoadingBar";
import { useProgress } from "../stores/useProgerss";
import { useEagerConnect } from "../hooks/useEagerConnect";
import { useWeb3Listener } from "../hooks/useWeb3Listener";
import ErrorBoundary from "../components/ErrorBoundary";

import "../styles/globals.scss";

const Connector: React.FC = ({ children }) => {
  useEagerConnect();
  useWeb3Listener();

  return <>{children}</>;
};

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  const dialog = useDialog((s) => s.dialog);
  const isAnimating = useProgress((s) => s.isAnimating);
  const setIsAnimating = useProgress((s) => s.setIsAnimating);

  useEffect(() => {
    const handleStart = () => {
      setIsAnimating(true);
    };

    const handleStop = () => {
      setIsAnimating(false);
    };

    router.events.on("routeChangeError", handleStop);
    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleStop);

    return () => {
      router.events.off("routeChangeError", handleStop);
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleStop);
    };
  }, [router, setIsAnimating]);

  return (
    <ErrorBoundary>
      <Providers>
        <Connector>
          <LoadingBar isAnimating={isAnimating} />
          <div className="dialog">{dialog}</div>
          <Header />
          <Component {...pageProps} />
          <Footer />
        </Connector>
      </Providers>
    </ErrorBoundary>
  );
}

export default MyApp;
