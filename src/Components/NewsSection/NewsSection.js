import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  loadNewsData,
  pagination,
  getnewsFromProvider,
} from "../../Store/Actions/NewsDetail";
import InfiniteScroll from "react-infinite-scroll-component";
import { Card, Row, Col, Typography, Layout } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
const { Meta } = Card;
const { Title } = Typography;
const { Header } = Layout;
export default function NewsSection() {
  const dispatch = useDispatch(),
    news = useSelector((state) => state.newsDetail.news),
    newsProvider = useSelector((state) => state.newsDetail.newsProvider),
    hasMoreNews = useSelector((state) => state.newsDetail.hasMoreNews),
    page = useSelector((state) => state.newsDetail.page),
    sourceDomain = useSelector((state) => state.newsDetail.sourceDomain);

  //get News data
  useEffect(() => {
    const data = {
      domain: sourceDomain,
      page: page,
    };
    dispatch(getnewsFromProvider(data));
  }, [sourceDomain]);

  //infinite load
  const loadNews = () => {
    const data = {
      domain: sourceDomain,
      page: page + 1,
    };
    dispatch(pagination(page + 1));
    dispatch(loadNewsData(data));
  };

  //infinite scrolling jsx
  const showNewsCard = (newsArr) => {
    return (
      <InfiniteScroll
        dataLength={newsArr && newsArr.length}
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
              const { urlToImage, description, title, publishedAt, url } = news;
              return (
                <Col className="gutter-row" span={4} key={url}>
                  <Card
                    loading={false}
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
  // hook returns
  return (
    <>
      <Header
        style={{
          display: "flex",
          justifyContent: "center",
          height: "100%",
          alignItems: "center",
        }}
      >
        <Title level={4}>All articles published by {newsProvider}</Title>
      </Header>
      <div>{showNewsCard(news)}</div>
    </>
  );
}
