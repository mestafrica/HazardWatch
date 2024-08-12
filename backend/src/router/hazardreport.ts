import express from 'express';
import multer from 'multer';
import controller from '../controllers/hazardreport';
import { extractJWT, checkAdmin } from '../middlewares/extractJWT';


// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      const uploadPath = 'src/uploads/';
      console.log('Saving files to:', uploadPath); // Log the path for debugging
      cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });
  
const router = express.Router();

router.post('/create', extractJWT, upload.array('images', 10), controller.createHazardReport);

router.patch('/update/:id', extractJWT, checkAdmin, controller.updateHazardReport);
router.delete('/delete/:id', extractJWT, checkAdmin, controller.deleteHazardReport);

router.get('/getall', controller.getAllHazardReports);
router.get('/getid/:id', controller.getHazardReportById);

export = router;
