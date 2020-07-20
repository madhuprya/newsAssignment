import React, { useEffect } from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { Carousel, Card } from "antd";
import { getTopNewsFromProvider } from "../../Store/Actions/NewsDetail";
const { Meta } = Card;
export default function TopNews() {
  //store fetch
  const dispatch = useDispatch(),
    topNews = useSelector((state) => state.newsDetail.topNews),
    newsSourceId = useSelector((state) => state.newsDetail.newsSourceId);

  //get Top News data
  useEffect(() => {
    dispatch(getTopNewsFromProvider(newsSourceId));
  }, [newsSourceId]);
  // carousel
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
        {topNews &&
          topNews.map((news) => {
            const { urlToImage, description, title, url, author } = news;
            return (
              <Link href="/newsDetail" as="/newsDetail" key={url}>
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
              </Link>
            );
          })}
      </Carousel>
    );
  };
  return <div>{showTopNewsCard(topNews)}</div>;
}
