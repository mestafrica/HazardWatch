import multer from 'multer';

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

export default upload;
