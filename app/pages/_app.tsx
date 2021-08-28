import type { AppProps } from "next/app";

import { Provider } from "react-redux";

import Layout from "components/Layout";
import store from "ducks/store";

import "styles/globals.scss";

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
};

export default App;
