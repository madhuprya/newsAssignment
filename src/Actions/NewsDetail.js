import { GET_SOURCES, NO_DATA, GET_NEWS_BY_PROVIDER } from "./ActionTypes";
import { allSourceAvailable, newsBySource } from "../ConfigUI/newsAPI";
import { baseURL, newsApiToken } from "../ConfigUI/configEnv";
const apiToken = `&apiKey=${newsApiToken}`;
export const getAllNewsSourceAvailable = () => (dispatch) => {
  fetch(`${baseURL}${allSourceAvailable}${newsApiToken}`)
    .then((res) => res.json())
    .then((res) =>
      dispatch({
        type: GET_SOURCES,
        payload: res.sources,
      })
    )
    .catch((error) => {
      dispatch({
        type: NO_DATA,
      });
    });
};

export const getnewsFromProvider = (data) => (dispatch) => {
  fetch(`${baseURL}${newsBySource}${data}${apiToken}`)
    .then((res) => res.json())
    .then((res) =>
      dispatch({
        type: GET_NEWS_BY_PROVIDER,
        payload: res.articles,
      })
    )
    .catch((error) => {
      dispatch({
        type: NO_DATA,
      });
    });
};
