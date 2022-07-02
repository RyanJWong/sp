/* eslint-disable react/jsx-props-no-spreading */
import "../styles/index.css";
import "../styles/index.scss";
import "../styles/NavBar.scss";
import "../styles/Layout.scss";
import "../styles/scss/nextjs-material-kit-pro.scss";

import { QueryClientProvider, QueryClient } from "react-query";

import { AppProps } from "next/app";
import { UserContextProvider } from "../context/UserContext";
import { BlockchainProvider } from "../context/BlockchainContext";
import Connector from "../containers/Connector";
import "../styles/global.scss";
// l

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
    return (
        <BlockchainProvider>
            <QueryClientProvider client={new QueryClient()}>
                <Connector.Provider>
                    <UserContextProvider>
                        <Component {...pageProps} />
                    </UserContextProvider>
                </Connector.Provider>
            </QueryClientProvider>
        </BlockchainProvider>
    );
};

export default MyApp;
