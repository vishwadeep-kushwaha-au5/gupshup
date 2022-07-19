import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'
import { persistStore } from 'redux-persist'
import reducer from './reducers/reducers';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage
}

// const persistedReducer = persistReducer(persistConfig, reducer)

const store = createStore(reducer,
    compose(
        applyMiddleware(thunk),
        (typeof window !== "undefined" && (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
            window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__())) ||
        compose,
    ));

const persistor = persistStore(store);
export { store, persistor };