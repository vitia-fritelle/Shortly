import { Router } from 'express';
import controllers from '../../controllers';

const router = Router();
const { getRanking } = controllers;

router
    .route('/')
    .get(getRanking);

export default router;
