import * as types from "../Actions/ActionTypes";
import { newsProviderPerPage } from "../../ConfigUI/configEnv";
import updateState from "../Helper";

const initialState = {
  news: [],
  newsSources: [],
  filteredSource: [],
  newsSourceId: "the-next-web",
  sourceDomain: "thenextweb.com",
  topNews: [],
  page: 1,
  hasMoreNews: true,
  newsProvider: "The Next Web",
  currentPageNumber: 2,
  PagedNewsSource: [],
  checkData: "",
};

const paginationUpdate = (data, count, page) => {
  if (data.length < count) {
    return data.slice(0);
  } else if (data.length < page * count) {
    return data.slice((page - 1) * count);
  } else {
    return data.slice((page - 1) * count, page * count);
  }
};

export default function (state = initialState, action) {
  const { payload } = action;
  const { news, currentPageNumber, filteredSource } = state;
  switch (action.type) {
    case types.NO_DATA:
      return {
        ...state,
        checkData: "error",
      };
    //   return updateState(state, initialState);
    case types.GET_SOURCES:
      return {
        ...state,
        newsSources: [...payload],
        filteredSource: [...payload],
        PagedNewsSource: [
          ...paginationUpdate(payload, newsProviderPerPage, currentPageNumber),
        ],
      };
    case types.GET_TOP_NEWS:
      return {
        ...state,
        topNews: [...payload],
      };
    case types.GET_NEWS_BY_PROVIDER:
      return {
        ...state,
        news: [...payload],
      };
    case types.GET_FILTERED_SOURCES:
      return {
        ...state,
        filteredSource: [...payload],
        PagedNewsSource: [
          ...paginationUpdate(payload, newsProviderPerPage, currentPageNumber),
        ],
      };
    case types.SET_SOURCE:
      return {
        ...state,
        newsSourceId: payload.id,
        sourceDomain: payload.domain,
        page: payload.page,
        hasMoreNews: payload.hasMoreNews,
        newsProvider: payload.newsProvider,
      };
    case types.INCREMENT_PAGE:
      return {
        ...state,
        page: payload,
      };
    case types.LOAD_NEWS:
      return {
        ...state,
        news: [...news.concat(payload)],
      };
    case types.LOAD_NEWS_FAIL:
      return {
        ...state,
        hasMoreNews: false,
      };
    case types.NEWS_SOURCE_PAGINATION:
      return {
        ...state,
        PagedNewsSource: [
          ...paginationUpdate(filteredSource, newsProviderPerPage, payload),
        ],
        currentPageNumber: payload,
      };
    default:
      return state;
  }
}
