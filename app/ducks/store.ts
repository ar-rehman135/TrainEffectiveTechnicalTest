import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools, EnhancerOptions } from "redux-devtools-extension";
import users from "ducks/users";

const composeEnhancers = composeWithDevTools || compose;

export default createStore(
  combineReducers({ users }),
  composeEnhancers(applyMiddleware(thunk) as EnhancerOptions)
);
