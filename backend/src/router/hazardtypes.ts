import express from 'express';
import controller from '../controllers/hazardtypes';

const router = express.Router();

router.post('/create', controller.createHazardType);
router.get('/all', controller.getAllHazardTypes);
router.get('/:id', controller.getHazardTypeById);
router.patch('/update/:id', controller.updateHazardType);
router.delete('/delete/:id', controller.deleteHazardType);

export = router;
