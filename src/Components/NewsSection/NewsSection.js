import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import {
  loadNewsData,
  pagination,
  getnewsFromProvider,
  newsDetailRoute,
} from "../../Store/Actions/NewsDetail";
import InfiniteScroll from "react-infinite-scroll-component";
import { Card, Row, Col, Typography, Layout } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const { Meta } = Card;
const { Title, Text } = Typography;
const { Header, Content } = Layout;
export default function NewsSection() {
  const dispatch = useDispatch(),
    news = useSelector((state) => state.newsDetail.news),
    newsProvider = useSelector((state) => state.newsDetail.newsProvider),
    hasMoreNews = useSelector((state) => state.newsDetail.hasMoreNews),
    page = useSelector((state) => state.newsDetail.page),
    sourceDomain = useSelector((state) => state.newsDetail.sourceDomain),
    newsSectionLoading = useSelector(
      (state) => state.newsDetail.newsSectionLoading
    ),
    newsSectionError = useSelector(
      (state) => state.newsDetail.newsSectionError
    );
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
  //route
  const routeToNewsDetail = (data) => {
    dispatch(newsDetailRoute(data));
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
          <p className="errorText">
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
                <Link href="/newsDetail" key={url}>
                  <Col
                    className="gutter-row"
                    span={4}
                    key={url}
                    onClick={routeToNewsDetail(news)}
                  >
                    <Card
                      loading={false}
                      hoverable
                      cover={<img alt={title} src={urlToImage} />}
                      extra={`Published On: ${publishedAt.substring(0, 10)}`}
                      className="cardData"
                    >
                      <Meta
                        title={title}
                        description={description}
                        className="metaData"
                      />
                    </Card>
                  </Col>
                </Link>
              );
            })}
        </Row>
      </InfiniteScroll>
    );
  };
  // hook returns
  return (
    <>
      {newsSectionLoading ? (
        <Typography className="loaderContainer">
          <div className="loaderWrapper">
            <LoadingOutlined className="loaderIcon" />
            <Text className="loaderText">News Section Loading...</Text>
          </div>
        </Typography>
      ) : newsSectionError ? (
        <Text className="errorText">Something went wrong!!</Text>
      ) : (
        <Content>
          <Header
            style={{
              display: "flex",
              justifyContent: "center",
              height: "100%",
              alignItems: "center",
            }}
          >
            <Title level={4} className="headTitle">
              All articles published by {newsProvider}
            </Title>
          </Header>
          {showNewsCard(news)}
        </Content>
      )}
    </>
  );
}
