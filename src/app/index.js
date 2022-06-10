import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import routes from '../routes';
import middlewares from '../middlewares';

const { handleErrors } = middlewares;

const app = express();
app.set('case sensitive routing', false);
app.set('strict routing', false);
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(routes);
app.use(handleErrors);
export default app;
