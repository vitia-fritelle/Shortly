import { Router } from 'express';
import controllers from '../../controllers';

const router = Router();
const { signup } = controllers;

router
    .route('/')
    .post(signup);

export default router;
