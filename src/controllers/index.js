import signin from './signinControllers';
import signup from './signupControllers';
import {
    shorten, getUrl, redirect, remove,
} from './urlsControllers';
import userStatus from './usersControllers';
import getRanking from './rankingControllers';

const controllers = {
    signin,
    signup,
    shorten,
    getUrl,
    redirect,
    remove,
    userStatus,
    getRanking,
};

export default controllers;
