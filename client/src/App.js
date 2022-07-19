import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Logging } from './components/Logging';
import Home from './components/Home'
import Profile from './components/Profile/Profile';

import { Backdrop, CircularProgress } from '@material-ui/core';
import PrivateRoute from './components/PrivateRoute'
import { makeStyles } from '@material-ui/core/styles';

import { refreshToken } from './redux/actions/auth';
import { api, apiJWT } from './utils/api';
import jwt_decode from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

function App() {

  const classes = useStyles();
  const dispatch = useDispatch()

  const state = useSelector(state => state.status.isLoading)
  const user = useSelector(state=> state?.auth?.user)

  // const refreshToken = async () => {
  //   try {
  //       const res = await api.post("/user/refreshAuthToken", { token: user?.refreshToken });
  //       dispatch({
  //               type: 'SET_AUTH',
  //               payload: {
  //                   data: {...user,...res?.data?.result}
  //               }
  //           })
  //       console.log("bolb1")
  //       return res?.data?.result
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // apiJWT.interceptors.request.use(
  //   async (config) => {
  //       console.log(config, user?.accessToken)
  //       let currentDate = new Date();
  //       const decodedToken = jwt_decode(user?.accessToken);
  //       if (decodedToken.exp * 1000 < currentDate.getTime()) {
  //         const data = await refreshToken();
  //         console.log("bolb2", data)
  //         config.headers["authorization"] = "Bearer " + data.accessToken;
  //         config.data["token"] = data.refreshToken
  //       }
  //       return config;
  //     },
  //   (error) => {
  //     console.log(error)
  //     return Promise.reject(error);
  //   }
  // );

  return (
    <div className="App">
      <Backdrop className={classes.backdrop} open={state}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Router>
        <Route exact path="/login" component={Logging} />
        <PrivateRoute exact path="/" component={Home} />
        <PrivateRoute exact path="/profile/:userId" component={Profile} />
      </Router>
    </div >
  );
}

export default App;
