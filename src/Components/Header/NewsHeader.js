import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import Pagination from "../Pagination/Pagination";
import {
  Layout,
  Drawer,
  Button,
  Input,
  Row,
  Col,
  Typography,
  Space,
} from "antd";
import {
  SearchOutlined,
  GlobalOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import {
  getnewsFromProvider,
  updatePagination,
  getAllNewsSourceAvailable,
} from "../../Store/Actions/NewsDetail";

const { Header } = Layout;
const { Search } = Input;
const { Title, Text } = Typography;

export default function NewsHeader() {
  //store fetch
  const dispatch = useDispatch(),
    [visible, setVisible] = useState(false),
    newsSources = useSelector((state) => state.newsDetail.newsSources),
    filteredSource = useSelector((state) => state.newsDetail.filteredSource),
    newsProvider = useSelector((state) => state.newsDetail.newsProvider),
    checkData = useSelector((state) => state.newsDetail.checkData),
    newsSourceLoading = useSelector(
      (state) => state.newsDetail.newsSourceLoading
    ),
    newsSourceError = useSelector((state) => state.newsDetail.newsSourceError),
    currentPageNumber = useSelector(
      (state) => state.newsDetail.currentPageNumber
    ),
    PagedNewsSource = useSelector((state) => state.newsDetail.PagedNewsSource);

  //get News provider data
  useEffect(() => {
    dispatch(getAllNewsSourceAvailable());
  }, [checkData]);

  // close news provider section
  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  //filter news provider
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

  //get news section
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
    dispatch(getnewsFromProvider(data));
  };

  //handle pagination
  const handlePageClick = (e) => {
    dispatch(updatePagination(e.selected + 1));
  };

  //get news provider
  const getSourceList = (newsSources) => {
    return (
      <Row gutter={[8, 24]} className="cardRow">
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
            <Col className="gutterRow" span={6} key={id}>
              <Link
                href={`/source?source_name=${id}`}
                as={`/source/${id}`}
                key={url}
              >
                <Button
                  key={id}
                  domain={domainName}
                  className="newsSourceBtn"
                  onClick={() => {
                    getNewsFromSource(id, domainName, name);
                  }}
                >
                  {name}
                </Button>
              </Link>
            </Col>
          );
        })}
      </Row>
    );
  };

  //hook returns
  return (
    <>
      <Layout>
        <Header className="headerContainer">
          <Space className="navBar" align="center">
            <GlobalOutlined className="iconFont" />
            <Title level={4} className="headTitle">
              Top Headlines from {newsProvider}
            </Title>
            <Button
              icon={<SearchOutlined />}
              onClick={showDrawer}
              type="primary"
              ghost
            >
              News By Provider
            </Button>
          </Space>
        </Header>
        <Drawer
          title={
            <Search
              placeholder="Search News Provider"
              onChange={(e) => handleSearch(newsSources, e)}
              className="navSearch"
            />
          }
          width={"100%"}
          placement={"top"}
          closable={true}
          onClose={onClose}
          visible={visible}
        >
          {newsSourceLoading ? (
            <Typography>
              <LoadingOutlined className="loadIcon" />
              <Text> News Source Provider Loading...</Text>
            </Typography>
          ) : newsSourceError ? (
            <Text>Something went wrong!!</Text>
          ) : (
            getSourceList(PagedNewsSource)
          )}
          {filteredSource && filteredSource.length > 6 ? (
            <Pagination
              currentPageNumber={currentPageNumber}
              handlePageClick={handlePageClick}
              totalNewsProvider={filteredSource.length}
            />
          ) : null}
        </Drawer>
      </Layout>
    </>
  );
}
