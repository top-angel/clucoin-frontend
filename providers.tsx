import { Web3ReactProvider } from "@web3-react/core";
import { CookiesProvider } from "react-cookie";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "react-query";
import { getLibrary } from "./utils/web3";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retryDelay: 10,
    },
  },
});

const Providers: React.FC = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Web3ReactProvider getLibrary={getLibrary}>
        <CookiesProvider>
          <Toaster
            containerClassName="toast-container"
            position="top-right"
            toastOptions={{
              style: { backgroundColor: "#1E1F24", color: "white" },
            }}
          />
          {children}
        </CookiesProvider>
      </Web3ReactProvider>
    </QueryClientProvider>
  );
};

export default Providers;
