import { Router } from 'express';
import { createBusiness, updateBusiness } from './controllers/controller';

const router: Router = Router();

router.post('/businesses', createBusiness);
router.put('/businesses/:fein', updateBusiness);

export default router;
