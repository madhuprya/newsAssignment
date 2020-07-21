import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { CoffeeOutlined } from "@ant-design/icons";
import { Typography, Card, Col } from "antd";
const { Title, Paragraph, Text } = Typography;
export default function NewsDetail() {
  //store fetch
  const newsDetail = useSelector((state) => state.newsDetail.newsDetail);

  return (
    <div>
      {newsDetail ? (
        <Typography>
          <Col>
            <Title>{newsDetail.title}</Title>
            {newsDetail.author ? <Text>By {newsDetail.author}</Text> : null}
          </Col>
          <Col>
            <Col>
              <Card
                style={{ width: 350 }}
                cover={
                  <img
                    src={newsDetail.urlToImage}
                    alt={newsDetail.source.name}
                  />
                }
              ></Card>
            </Col>
            <Paragraph>{newsDetail.content}</Paragraph>
          </Col>
          <Col>
            <Paragraph>{newsDetail.description}</Paragraph>
            <Text>{newsDetail.publishedAt}</Text>
          </Col>
        </Typography>
      ) : (
        <CoffeeOutlined />
      )}
    </div>
  );
}
