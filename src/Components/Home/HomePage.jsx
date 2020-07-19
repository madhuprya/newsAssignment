import React, { Component, useEffect, useState } from "react";
import { connect } from "react-redux";
import NewsHeader from "../Header/NewsHeader";
import TopNews from "../TopNews/TopNews";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  getAllNewsSourceAvailable,
  getnewsFromProvider,
  getTopNewsFromProvider,
  pagination,
  loadNewsData,
} from "../../Actions/NewsDetail";
import { Card, Row, Col } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const { Meta } = Card;
class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardLoading: false,
    };
  }
  componentDidMount() {
    const { props } = this;
    const {
      getAllNewsSourceAvailable,
      getnewsFromProvider,
      getTopNewsFromProvider,
      sourceDomain,
      newsSourceId,
      page,
    } = props;
    const data = {
      domain: sourceDomain,
      page: page,
    };
    getAllNewsSourceAvailable();
    getnewsFromProvider(data);
    getTopNewsFromProvider(newsSourceId);
  }

  loadNews = () => {
    const { props } = this;
    const { sourceDomain, page, pagination, loadNewsData } = props;
    const data = {
      domain: sourceDomain,
      page: page + 1,
    };
    pagination(page + 1);
    loadNewsData(data);
  };
  showNewsCard = (newsArr) => {
    const { loadNews, state, props } = this;
    const { cardLoading } = state;
    const { hasMoreNews } = props;
    return (
      <InfiniteScroll
        dataLength={newsArr.length}
        next={loadNews}
        hasMore={hasMoreNews}
        scrollThreshold={0.8}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
        loader={
          hasMoreNews ? <LoadingOutlined style={{ height: "100px" }} /> : ""
        }
      >
        <Row gutter={[8, 24]} className="card-row">
          {newsArr &&
            newsArr.map((news) => {
              const { urlToImage, description, title, publishedAt } = news;
              return (
                <Col className="gutter-row" span={4}>
                  <Card
                    loading={cardLoading}
                    hoverable
                    cover={<img alt={title} src={urlToImage} />}
                    extra={`Published At: ${publishedAt.substring(0, 10)}`}
                  >
                    <Meta title={title} description={description} />
                  </Card>
                </Col>
              );
            })}
        </Row>
      </InfiniteScroll>
    );
  };

  render() {
    const { state, props, showNewsCard } = this;
    const {} = state;
    const { news } = props;
    return (
      <>
        <NewsHeader />
        <TopNews />
        <div id="scrollableDiv">{showNewsCard(news)}</div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  newsSources: state.newsDetail.newsSources,
  news: state.newsDetail.news,
  sourceDomain: state.newsDetail.sourceDomain,
  newsSourceId: state.newsDetail.newsSourceId,
  page: state.newsDetail.page,
  hasMoreNews: state.newsDetail.hasMoreNews,
});

export default connect(mapStateToProps, {
  getAllNewsSourceAvailable,
  getnewsFromProvider,
  getTopNewsFromProvider,
  pagination,
  loadNewsData,
})(HomePage);
