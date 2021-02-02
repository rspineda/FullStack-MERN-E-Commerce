import React, {useEffect} from "react";
import { Switch, Route } from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Home from './pages/Home';
import Header from './components/nav/Header';
import RegisterComplete from './pages/auth/RegisterComplete';
import ForgotPassword from './pages/auth/ForgotPassword';

import {auth} from './firebase';
import {useDispatch} from 'react-redux';

const App = () => {
  
  const dispatch = useDispatch();

  //to check firebase auth state;
  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged(async (user)=>{
      if(user){
        const idTokenResult = await user.getIdTokenResult();
        dispatch({
          type: "LOGGED_IN_USER",
          payload: {
            email: user.email,
            token: idTokenResult.token
          }
        })
      }
    })
  }, [])

  return (
    <>
    <Header></Header>
    <ToastContainer></ToastContainer>
    <Switch>
      <Route exact path="/" component={Home}></Route>
      <Route exact path="/login" component={Login}></Route>
      <Route exact path="/register" component={Register}></Route>
      <Route exact path="/register/complete" component={RegisterComplete}></Route>
      <Route exact path="/forgot/password" component={ForgotPassword}></Route>
    </Switch>
    </>
    
  )
}

export default App;
