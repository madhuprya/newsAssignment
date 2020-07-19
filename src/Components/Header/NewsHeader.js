import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Pagination from "../Pagination/Pagination";
import { Layout, Drawer, Button, Input, Row, Col, Typography } from "antd";
import { SearchOutlined, GlobalOutlined } from "@ant-design/icons";
import {
  getTopNewsFromProvider,
  getnewsFromProvider,
  updatePagination,
} from "../../Actions/NewsDetail";
import { newsProviderPerPage } from "../../ConfigUI/configEnv";

const { Header } = Layout;
const { Search } = Input;
const { Title } = Typography;

export default function NewsHeader() {
  const [visible, setVisible] = useState(false);
  const newsSources = useSelector((state) => state.newsDetail.newsSources),
    filteredSource = useSelector((state) => state.newsDetail.filteredSource),
    newsProvider = useSelector((state) => state.newsDetail.newsProvider),
    currentPageNumber = useSelector(
      (state) => state.newsDetail.currentPageNumber
    ),
    PagedNewsSource = useSelector((state) => state.newsDetail.PagedNewsSource);
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
  const getNewsFromSource = (id, domain, name) => {
    const data = {
      domain: domain,
      page: 1,
    };
    dispatch({
      type: "SET_SOURCE",
      payload: {
        id: id,
        domain: domain,
        page: 1,
        hasMoreNews: true,
        newsProvider: name,
      },
    });
    dispatch(getTopNewsFromProvider(id));
    dispatch(getnewsFromProvider(data));
  };
  const handlePageClick = (e) => {
    dispatch(updatePagination(e.selected + 1));
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
                  getNewsFromSource(id, domainName, name);
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
            justifyContent: "space-between",
            height: "100%",
            alignItems: "center",
          }}
        >
          <GlobalOutlined />
          <Title level={4}>Top headlines from {newsProvider}</Title>
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
      >
        {getSourceList(PagedNewsSource)}
        {filteredSource && filteredSource.length > 6 ? (
          <Pagination
            currentPageNumber={currentPageNumber}
            handlePageClick={handlePageClick}
            totalNewsProvider={filteredSource.length}
          />
        ) : null}
      </Drawer>
    </Layout>
  );
}
