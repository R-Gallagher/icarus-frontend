import reducers from "./reducers";
import { applyMiddleware, createStore } from "redux";
import reduxThunk from "redux-thunk";

// this needs to be here so it can be accessed in two ways
// 1. In index, where it is passed to the react-redux provider
// 2. In IcarusRest, where it is used in network interceptors that insure
//    we aren't letting csrf errors or authenticated expirys lead to bad UX
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));
export default store;
