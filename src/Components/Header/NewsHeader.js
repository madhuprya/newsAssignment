import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Layout, Drawer, Button, Input, Row, Col } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import {
  getTopNewsFromProvider,
  getnewsFromProvider,
} from "../../Actions/NewsDetail";

const { Header } = Layout;
const { Search } = Input;
export default function NewsHeader() {
  const [visible, setVisible] = useState(false);
  const newsSources = useSelector((state) => state.newsDetail.newsSources);
  const filteredSource = useSelector(
    (state) => state.newsDetail.filteredSource
  );

  const dispatch = useDispatch();

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const handleSearch = (newsSources, e) => {
    const { value } = e.target;
    const filterSource = newsSources.filter((source) => {
      return source.name.toLowerCase().includes(value.toLowerCase());
    });
    dispatch({
      type: "GET_FILTERED_SOURCES",
      payload: filterSource,
    });
  };
  const getNewsFromSource = (id, domain) => {
    const data = {
      domain: domain,
      page: 1,
    };
    dispatch(getTopNewsFromProvider(id));
    dispatch(getnewsFromProvider(data));
  };
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
              <Button
                key={id}
                domain={domainName}
                style={{ width: "100%" }}
                onClick={() => {
                  getNewsFromSource(id, domainName);
                }}
              >
                {name}
              </Button>
            </Col>
          );
        })}
      </Row>
    );
  };
  return (
    <Layout>
      <Header
        style={{
          position: "fixed",
          zIndex: 1,
          width: "100%",
          background: "rgba(255,255,255,0.1)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            height: "100%",
            alignItems: "center",
          }}
        >
          <Button
            icon={<SearchOutlined />}
            onClick={showDrawer}
            type="primary"
            ghost
          >
            News By Provider
          </Button>
        </div>
      </Header>
      <Drawer
        title={
          <Search
            placeholder="Search News Provider"
            onChange={(e) => handleSearch(newsSources, e)}
            style={{ width: "300px" }}
          />
        }
        width={"100%"}
        placement={"top"}
        closable={true}
        onClose={onClose}
        visible={visible}
        destroyOnClose={true}
      >
        {getSourceList(filteredSource)}
      </Drawer>
    </Layout>
  );
}
