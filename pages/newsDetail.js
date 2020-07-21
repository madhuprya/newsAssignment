import React, { Component } from "react";
import Head from "next/head";
import NewsHeader from "../src/Components/Header/NewsHeader";
import NewsDetail from "../src/Components/NewsDetail/NewsDetail";
import TopNews from "../src/Components/TopNews/TopNews";
export default class NewsDetailPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Head>
          <title>News Detail Page</title>
        </Head>
        <NewsHeader />
        <TopNews />
        <NewsDetail />
      </div>
    );
  }
}
