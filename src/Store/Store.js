import thunk from "redux-thunk";
import { createStore, combineReducers, applyMiddleware } from "redux";
import NewsDetail from "../Reducers/NewsDetail.js";
const middleware = [thunk];
const rootReducer = combineReducers({
  newsDetail: NewsDetail,
});
const store = createStore(rootReducer, applyMiddleware(...middleware));

export default store;
