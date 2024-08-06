import express from 'express';
import controller from '../controllers/hazardtypes';
import extractJWT from 'middlewares/extractJWT';

const router = express.Router();

router.post('/create',extractJWT, controller.createHazardType);
router.get('/all',extractJWT, controller.getAllHazardTypes);
router.get('/:id',extractJWT, controller.getHazardTypeById);
router.patch('/update/:id',extractJWT, controller.updateHazardType);
router.delete('/delete/:id',extractJWT, controller.deleteHazardType);

export = router;
