import React from "react";
import { useSelector } from "react-redux";
import { Button, Row, Col } from "antd";
export default function NewsHeader() {
  const newsSources = useSelector((state) => state.newsDetail.newsSources);
  const getSourceList = (newsSources) => {
    return (
      <Row gutter={[8, 24]} className="card-row">
        {newsSources.map((source) => {
          const { category, country, language, url, name, id } = source;
          let domainName = url
            .replace("http://", "")
            .replace("https://", "")
            .split(/[/?#]/)[0];
          const regexArr = [
            `${category.toLowerCase()}.`,
            `${country.toLowerCase()}.`,
            `${language.toLowerCase()}.`,
            "www.",
            "news.",
          ];
          regexArr.forEach((reg) => {
            if (domainName.includes(reg)) {
              domainName = domainName.replace(reg, "");
            }
          });
          return (
            <Col className="gutter-row" span={6}>
              <Button key={id} domain={domainName} style={{ width: "100%" }}>
                {name}
              </Button>
            </Col>
          );
        })}
      </Row>
    );
  };
  return <div>{getSourceList(newsSources)}</div>;
}
