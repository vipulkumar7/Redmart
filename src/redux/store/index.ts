import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import rootReducer from '../rootReducer'
import mySaga from '../sagas/saga'

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
    key: 'persist-store',
    storage,
}
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
    persistedReducer,
    composeWithDevTools(applyMiddleware(thunkMiddleware, sagaMiddleware))
)

sagaMiddleware.run(mySaga);

export const persistor = persistStore(store as any)

export default store;
