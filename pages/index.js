import React, { Component } from "react";
import Head from "next/head";
import NewsHeader from "../src/Components/Header/NewsHeader";
import NewsSection from "../src/Components/NewsSection/NewsSection";
import TopNews from "../src/Components/TopNews/TopNews";
import { Layout } from "antd";
export default class HomePage extends Component {
  static async getInitialProps({ store }) {
    const serverData = store.getState((serverStoreData) => {
      return serverStoreData;
    });
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Head></Head>
        <Layout>
          <NewsHeader />
          <TopNews />
          <NewsSection />
        </Layout>
      </div>
    );
  }
}
