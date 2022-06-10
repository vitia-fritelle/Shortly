import { Router } from 'express';
import signupRoute from './signupRoute';
import signinRoute from './signinRoute';
import urlsRoute from './urlsRoute';
import usersRoute from './usersRoute';
import rankingRoute from './rankingRoute';

const router = Router();

const routes = [
    {
        path: '/signup',
        route: signupRoute,
    },
    {
        path: '/signin',
        route: signinRoute,
    },
    {
        path: '/urls',
        route: urlsRoute,
    },
    {
        path: '/users',
        route: usersRoute,
    },
    {
        path: '/ranking',
        route: rankingRoute,
    },
];

routes.forEach(({ path, route }) => router.use(path, route));
export default router;
