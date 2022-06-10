import signin from './signinControllers';
import signup from './signupControllers';
import {
    shorten, getUrl, redirect, remove,
} from './urlsControllers';

const controllers = {
    signin,
    signup,
    shorten,
    getUrl,
    redirect,
    remove,
};

export default controllers;
