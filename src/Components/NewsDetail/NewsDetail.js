import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { CoffeeOutlined } from "@ant-design/icons";
import { Typography, Card, Col } from "antd";
const { Title, Paragraph, Text } = Typography;
const { Meta } = Card;
export default function NewsDetail() {
  //store fetch
  const newsDetail = useSelector((state) => state.newsDetail.newsDetail);
  const { author, title, urlToImage, source, url, publishedAt } = newsDetail;
  return (
    <div className="newsDetailContainer">
      {newsDetail ? (
        <Typography>
          <Col>
            <Title>{title}</Title>
            {author ? <Text>By {author}</Text> : null}
          </Col>
          <Col>
            <Col>
              <Card
                style={{ width: 350 }}
                cover={<img src={urlToImage} alt={source.name} />}
              >
                <Meta
                  title={`Published On: ${publishedAt.substring(0, 10)}`}
                  description={<a href={url}>{url}</a>}
                  className="metaData"
                />
              </Card>
            </Col>
            <Paragraph>{newsDetail.content}</Paragraph>
          </Col>
          <Col>
            <Paragraph>{newsDetail.description}</Paragraph>
          </Col>
        </Typography>
      ) : (
        <Typography className="loaderContainer">
          <div className="loaderWrapper">
            <CoffeeOutlined className="loaderIcon" />
            <Text className="loaderText">no data available</Text>
          </div>
        </Typography>
      )}
    </div>
  );
}
