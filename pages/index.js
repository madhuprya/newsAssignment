import React, { Component } from "react";
import Head from "next/head";
import Link from "next/link";
import NewsHeader from "../src/Components/Header/NewsHeader";
import HomePage from "../src/Components/NewsSection/NewsList";
import { getAllNewsSourceAvailable } from "../src/Store/Actions/NewsDetail";
import { styles } from "./App.module.css";
export default class Home extends Component {
  static async getInitialProps({ store }) {
    await store.dispatch(getAllNewsSourceAvailable());
    const data = store.getState((newsSources) => {
      return newsSources;
    });
    console.log(data, "server data check");
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Head>
          <title>News App</title>
        </Head>
        <main>
          <h1>Welcome to next</h1>
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
        </main>
        <NewsHeader />
        <HomePage />
      </div>
    );
  }
}
