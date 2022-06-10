import { Router } from 'express';
import controllers from '../../controllers';

const {
    shorten, getUrl, redirect, remove,
} = controllers;
const router = Router();

router
    .route('/shorten')
    .post(shorten);

router
    .route('/:id')
    .get(getUrl)
    .delete(remove);

router
    .route('/open/:shortUrl')
    .get(redirect);

export default router;
