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

const upload = multer({ storage, 
    limits: { fileSize: 5 * 1024 * 1024 }, //File size limit
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith("image/")) {
            cb(null, true);
        } else {
            cb(new Error("Invalid file type, only images are allowed!"));
        }
    }
});

export default upload;
