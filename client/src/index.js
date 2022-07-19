import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import { api, apiJWT } from './utils/api';
import jwt_decode from "jwt-decode";
import { PersistGate } from 'redux-persist/integration/react';
import './index.css'

import theme from './utils/theme'
import {ThemeProvider} from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline';

ReactDOM.render(
  <>
    <PersistGate loading={null} persistor={persistor}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline/>
          <App />
        </ThemeProvider>
      </Provider>
    </PersistGate>
  </>,
  document.getElementById('root')
);

const refreshToken = async () => {
  try {
      let user = store.getState().auth.user
      const res = await api.post("/user/refreshAuthToken", { token: user?.refreshToken });
      store.dispatch({
              type: 'SET_AUTH',
              payload: {
                  data: {...user,...res?.data?.result}
              }
          })
      return res?.data?.result
  } catch (err) {
    console.log(err);
  }
};

apiJWT.interceptors.request.use(
  async (config) => {
      let user = store.getState().auth.user
      let currentDate = new Date();
      const decodedToken = jwt_decode(user?.accessToken);
      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        const data = await refreshToken();
        config.headers["authorization"] = "Bearer " + data.accessToken;
        if(config["data"]===undefined)
          config["data"] = {}
        config["data"]["token"] = data.refreshToken
      }else{
        config.headers["authorization"] = "Bearer " + user.accessToken;
        if(config["data"]===undefined)
          config["data"] = {}
        config["data"]["token"] = user.refreshToken
      }
      return config;
    },
  (error) => {
    return Promise.reject(error);
  }
);