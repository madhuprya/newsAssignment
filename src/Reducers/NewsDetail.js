import {
  NO_DATA,
  GET_SOURCES,
  GET_TOP_NEWS,
  GET_NEWS_BY_PROVIDER,
  GET_FILTERED_SOURCES,
  SET_SOURCE,
  INCREMENT_PAGE,
  LOAD_NEWS,
  LOAD_NEWS_FAIL,
} from "../Actions/ActionTypes";
import updateState from "../Store/Helper";

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
};

export default function (state = initialState, action) {
  const { payload } = action;
  const { news } = state;
  switch (action.type) {
    case NO_DATA:
      return {
        ...state,
      };
    //   return updateState(state, initialState);
    case GET_SOURCES:
      return {
        ...state,
        newsSources: [...payload],
        filteredSource: [...payload],
      };
    case GET_TOP_NEWS:
      return {
        ...state,
        topNews: [...payload],
      };
    case GET_NEWS_BY_PROVIDER:
      return {
        ...state,
        news: [...payload],
      };
    case GET_FILTERED_SOURCES:
      return {
        ...state,
        filteredSource: [...payload],
      };
    case SET_SOURCE:
      return {
        ...state,
        newsSourceId: payload.id,
        sourceDomain: payload.domain,
        page: payload.page,
        hasMoreNews: payload.hasMoreNews,
      };
    case INCREMENT_PAGE:
      return {
        ...state,
        page: payload,
      };
    case LOAD_NEWS:
      return {
        ...state,
        news: [...news.concat(payload)],
      };
    case LOAD_NEWS_FAIL:
      return {
        ...state,
        hasMoreNews: false,
      };
    default:
      return state;
  }
}
