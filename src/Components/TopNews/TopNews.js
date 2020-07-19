import React from "react";
import { useSelector } from "react-redux";
import { Carousel, Card } from "antd";
const { Meta } = Card;

export default function TopNews() {
  const topNews = useSelector((state) => state.newsDetail.topNews);
  const showTopNewsCard = (topNews) => {
    const settings = {
      dots: true,
      autoplay: true,
      speed: 1000,
      slidesToShow: 1,
      slidesToScroll: 1,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            // dots: true
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            initialSlide: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };
    return (
      <Carousel {...settings}>
        {topNews.map((news) => {
          const { urlToImage, description, title } = news;
          return (
            <Card
              loading={false}
              hoverable
              cover={<img alt={title} src={urlToImage} />}
              bodyStyle={{
                padding: "10%",
                position: "absolute",
                top: "0px",
                zIndex: 10,
                width: "100%",
                background: "rgba(1, 1, 1, 0.5)",
                height: "100%",
              }}
            >
              <Meta
                className="slick-card-body"
                title={title}
                description={description}
              />
            </Card>
          );
        })}
      </Carousel>
    );
  };
  return <div>{showTopNewsCard(topNews)}</div>;
}
