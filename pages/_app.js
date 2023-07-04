import "../styles/globals.css";
import "antd/dist/antd.css"; 

import '../components/admins/AdminNavbar.css';
import '../components/admins/AdminMenubar.css';

import { Provider } from "react-redux";

import store from "../store";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
