/* eslint-disable @typescript-eslint/no-explicit-any */
import { legacy_createStore as createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import rootReducer from "../rootReducer";
import mySaga from "../sagas/saga";

const sagaMiddleware = createSagaMiddleware();

const store: any = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunkMiddleware, sagaMiddleware))
);

sagaMiddleware.run(mySaga);

export default store;
