import {
  GET_SOURCES,
  NO_DATA,
  GET_NEWS_BY_PROVIDER,
  GET_TOP_NEWS,
  INCREMENT_PAGE,
  LOAD_NEWS,
  LOAD_NEWS_FAIL,
  NEWS_SOURCE_PAGINATION,
} from "./ActionTypes";
import {
  allSourceAvailable,
  newsBySource,
  topHeadlinesFromSource,
} from "../ConfigUI/newsAPI";
import axios from "axios";
import { baseURL, newsApiToken } from "../ConfigUI/configEnv";
export const getAllNewsSourceAvailable = () => (dispatch) => {
  axios({
    method: "GET",
    url: `${baseURL}${allSourceAvailable}`,
    params: { apiKey: newsApiToken },
  })
    .then((res) =>
      dispatch({
        type: GET_SOURCES,
        payload: res.data.sources,
      })
    )
    .catch((error) => {
      dispatch({
        type: NO_DATA,
      });
    });
};

export const getnewsFromProvider = (data) => (dispatch) => {
  axios({
    method: "GET",
    url: `${baseURL}${newsBySource}`,
    params: {
      domains: data.domain,
      apiKey: newsApiToken,
      pageSize: 8,
      page: data.page,
    },
  })
    .then((res) =>
      dispatch({
        type: GET_NEWS_BY_PROVIDER,
        payload: res.data.articles,
      })
    )
    .catch((error) => {
      dispatch({
        type: NO_DATA,
      });
    });
};
export const getTopNewsFromProvider = (data) => (dispatch) => {
  axios({
    method: "GET",
    url: `${baseURL}${topHeadlinesFromSource}`,
    params: { sources: data, apiKey: newsApiToken },
  })
    .then((res) =>
      dispatch({
        type: GET_TOP_NEWS,
        payload: res.data.articles,
      })
    )
    .catch((error) => {
      dispatch({
        type: NO_DATA,
      });
    });
};

export const pagination = (data) => (dispatch) => {
  dispatch({
    type: INCREMENT_PAGE,
    payload: data,
  });
};

export const loadNewsData = (data) => (dispatch) => {
  axios({
    method: "GET",
    url: `${baseURL}${newsBySource}`,
    params: {
      domains: data.domain,
      apiKey: newsApiToken,
      pageSize: 8,
      page: data.page,
    },
  })
    .then((res) =>
      dispatch({
        type: LOAD_NEWS,
        payload: res.data.articles,
      })
    )
    .catch((error) => {
      dispatch({
        type: LOAD_NEWS_FAIL,
      });
    });
};

export const updatePagination = (data) => (dispatch) => {
  dispatch({
    type: NEWS_SOURCE_PAGINATION,
    payload: data,
  });
};
