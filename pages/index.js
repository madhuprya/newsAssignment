import React, { Component } from "react";
import Head from "next/head";
import NewsHeader from "../src/Components/Header/NewsHeader";
import NewsSection from "../src/Components/NewsSection/NewsSection";
import TopNews from "../src/Components/TopNews/TopNews";
import { Layout } from "antd";
export default class HomePage extends Component {
  static async getInitialProps({ req }) {
    // const serverData = store.getState((serverStoreData) => {
    //   return serverStoreData;
    // });
    let newsData = new Array();
    if (req.params && req.params.source_name) {
      let metaData = {
        title: `news source  ${req.params.source_name} `,
        description: `search by any news provider name like ${req.params.source_name} `,
        keywords: `News Provided by ${req.params.source_name}`,
        url: `localhost:3000/source/${req.params.source_name}`,
      };
      newsData["metaData"] = metaData;
    }
    return { ...newsData };
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Head>
          <title>
            {this.props.metaData.title
              ? this.props.metaData.title
              : "News Home Page"}
          </title>
          <meta name="description" content={this.props.metaData.description} />
          <meta name="keyword" content={this.props.metaData.keywords} />
          <link rel="canonical" href={this.props.metaData.url} />
        </Head>
        <Layout>
          <NewsHeader />
          <TopNews />
          <NewsSection />
        </Layout>
      </div>
    );
  }
}
