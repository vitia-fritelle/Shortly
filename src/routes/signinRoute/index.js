import { Router } from 'express';
import controllers from '../../controllers';

const router = Router();
const { signin } = controllers;

router
    .route('/')
    .post(signin);

export default router;
