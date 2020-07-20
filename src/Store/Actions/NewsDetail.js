import * as types from "./ActionTypes";
import {
  allSourceAvailable,
  newsBySource,
  topHeadlinesFromSource,
} from "../../ConfigUI/newsAPI";
import axios from "axios";
import { baseURL, newsApiToken } from "../../ConfigUI/configEnv";
export const getAllNewsSourceAvailable = () => (dispatch) => {
  axios({
    method: "GET",
    url: `${baseURL}${allSourceAvailable}`,
    params: { apiKey: newsApiToken },
  })
    .then((res) => res.data)
    .then((res) =>
      dispatch({
        type: types.GET_SOURCES,
        payload: res.sources,
      })
    )
    .catch((error) => {
      dispatch({
        type: types.NO_DATA,
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
        type: types.GET_NEWS_BY_PROVIDER,
        payload: res.data.articles,
      })
    )
    .catch((error) => {
      dispatch({
        type: types.NO_DATA,
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
        type: types.GET_TOP_NEWS,
        payload: res.data.articles,
      })
    )
    .catch((error) => {
      dispatch({
        type: types.NO_DATA,
      });
    });
};

export const pagination = (data) => (dispatch) => {
  dispatch({
    type: types.INCREMENT_PAGE,
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
        type: types.LOAD_NEWS,
        payload: res.data.articles,
      })
    )
    .catch((error) => {
      dispatch({
        type: types.LOAD_NEWS_FAIL,
      });
    });
};

export const updatePagination = (data) => (dispatch) => {
  dispatch({
    type: types.NEWS_SOURCE_PAGINATION,
    payload: data,
  });
};
