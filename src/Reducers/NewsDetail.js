import {
  NO_DATA,
  GET_SOURCES,
  GET_NEWS_BY_PROVIDER,
} from "../Actions/ActionTypes";
import updateState from "../Store/Helper";

const initialState = {
  news: [],
  newsSources: [],
  sourceDomain: "thenextweb.com",
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
      };
    case GET_NEWS_BY_PROVIDER:
      return {
        ...state,
        news: [...payload],
      };

    default:
      return state;
  }
}
