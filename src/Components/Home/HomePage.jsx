import React, { Component } from "react";
import { connect } from "react-redux";
import NewsHeader from "../Header/NewsHeader";
import {
  getAllNewsSourceAvailable,
  getnewsFromProvider,
} from "../../Actions/NewsDetail";
import { Card, Row, Col } from "antd";
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
      sourceDomain,
    } = props;
    getAllNewsSourceAvailable();
    getnewsFromProvider(sourceDomain);
  }

  showNewsCard = (newsArr) => {
    const { cardLoading } = this.state;
    return (
      <Row gutter={[8, 24]} className="card-row">
        {newsArr &&
          newsArr.map((news) => {
            const { urlToImage, description, title, publishedAt } = news;
            return (
              <Col className="gutter-row" span={6}>
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
    );
  };

  render() {
    const { state, props, showNewsCard } = this;
    const {} = state;
    const { news } = props;
    return (
      <>
        <NewsHeader />
        {showNewsCard(news)}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  newsSources: state.newsDetail.newsSources,
  news: state.newsDetail.news,
  sourceDomain: state.newsDetail.sourceDomain,
});

export default connect(mapStateToProps, {
  getAllNewsSourceAvailable,
  getnewsFromProvider,
})(HomePage);
