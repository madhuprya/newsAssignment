import {
  NO_DATA,
  GET_SOURCES,
  GET_TOP_NEWS,
  GET_NEWS_BY_PROVIDER,
  GET_FILTERED_SOURCES,
  SET_SOURCE,
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
};

export default function (state = initialState, action) {
  const { payload } = action;
  switch (action.type) {
    case NO_DATA:
      return updateState(state, initialState);
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
      };
    default:
      return state;
  }
}
