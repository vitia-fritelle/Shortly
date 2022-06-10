import { Router } from 'express';
import controllers from '../../controllers';

const router = Router();
const { userStatus } = controllers;

router
    .route('/:id')
    .get(userStatus);

export default router;
