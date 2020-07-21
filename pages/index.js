import React, { Component } from "react";
import Head from "next/head";
import { connect } from "react-redux";
import NewsHeader from "../src/Components/Header/NewsHeader";
import NewsSection from "../src/Components/NewsSection/NewsSection";
import TopNews from "../src/Components/TopNews/TopNews";
import { LoadingOutlined } from "@ant-design/icons";
import { Layout } from "antd";
class HomePage extends Component {
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
        <Layout>
          <NewsHeader />
          <TopNews />
          <NewsSection />
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.newsDetail.loading,
});

export default connect(mapStateToProps)(HomePage);
