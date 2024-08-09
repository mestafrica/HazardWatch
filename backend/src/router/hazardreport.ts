import express from 'express';
import multer from 'multer';
import controller from '../controllers/hazardreport';
import { extractJWT, checkAdmin } from '../middlewares/extractJWT';


// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    }
  });
  
  const upload = multer({ storage });
  
const router = express.Router();

router.post('users/hazardreport', extractJWT, checkAdmin, upload.array('images', 10), controller.createHazardReport);

router.patch('/users/hazardreport/:id', extractJWT, checkAdmin, controller.updateHazardReport);
router.delete('/users/hazardreport/:id', extractJWT, checkAdmin, controller.deleteHazardReport);

router.get('/users/hazardreport', controller.getAllHazardReports);
router.get('/users/hazardreport/:id', controller.getHazardReportById);

export = router;
