import React, { Component } from "react";
import Head from "next/head";
import Link from "next/link";
import NewsHeader from "../src/Components/Header/NewsHeader";
import NewsSection from "../src/Components/NewsSection/NewsSection";
import TopNews from "../src/Components/TopNews/TopNews";
// import { getAllNewsSourceAvailable } from "../src/Store/Actions/NewsDetail";
import { LoadingOutlined } from "@ant-design/icons";
import { styles } from "./App.module.css";
export default class HomePage extends Component {
  static async getInitialProps({ store }) {
    // const response = await store.dispatch(getAllNewsSourceAvailable());
    const serverData = store.getState((serverStoreData) => {
      return serverStoreData;
    });
    // console.log(serverData, "server data check");
  }

  constructor(props) {
    super(props);
  }

  // componentDidMount()
  render() {
    const { serverData } = this.props;
    return (
      <div>
        <Head>
          <title>News Home Page</title>
        </Head>
        {/* <main>
          <ul>
            <li>
              <Link href="/">
                <a>Home</a>
              </Link>
              <Link href="/newsDetail">
                <button>News Provider</button>
              </Link>
            </li>
          </ul>
        </main> */}
        {serverData ? (
          <LoadingOutlined className={styles.LoadIcon} />
        ) : (
          <>
            <NewsHeader />
            <TopNews />
            <NewsSection />
          </>
        )}
      </div>
    );
  }
}
