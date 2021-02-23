import React from 'react';
import { Route, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoadingToRedirect from './LoadingToRedirect';

//Protected page, it shows content only for logged in users
const UserRoute = ({children, ...rest}) => {
    const { user } = useSelector((state)=> ({...state}));

    return user && user.token ? (<Route {...rest} render={()=> children}></Route>) : (
    <LoadingToRedirect></LoadingToRedirect>);
};

export default UserRoute;