import React, { Component } from "react";
import Head from "next/head";
import NewsHeader from "../src/Components/Header/NewsHeader";
import NewsSection from "../src/Components/NewsSection/NewsSection";
import TopNews from "../src/Components/TopNews/TopNews";
import { LoadingOutlined } from "@ant-design/icons";
import { styles } from "./App.module.css";
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
        <Head>
          <title>News Home Page</title>
        </Head>
        <NewsHeader />
        <TopNews />
        <NewsSection />
      </div>
    );
  }
}
