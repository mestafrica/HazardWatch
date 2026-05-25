import { NextFunction, Request, Response } from "express";
import multer from "multer";
import cloudinary from "../config/cloudinary";

const storage = multer.memoryStorage();

const hazardUpload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024, files: 5 },
});

const announcementUpload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024, files: 5 },
});

const profileUpload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024, files: 1 }, // 2MB, single file
});

const streamToCloudinary = (
  buffer: Buffer,
  folder: string,
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error || !result) return reject(error);
        resolve(result.secure_url);
      },
    );
    stream.end(buffer);
  });
};

export const uploadHazardFiles = [
  hazardUpload.array("files", 5),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.files?.length) return next();

      const allowedTypes = new Set([
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/webp",
        "image/gif",
      ]);

      const files = req.files as Express.Multer.File[];

      const invalid = files.find((f) => !allowedTypes.has(f.mimetype));
      if (invalid) {
        return res.status(400).json({
          message: "Invalid file type. Allowed: jpg, jpeg, png, webp, gif.",
        });
      }

      req.body.images = await Promise.all(
        files.map((f) =>
          streamToCloudinary(f.buffer, "hazardwatch/hazards/pictures"),
        ),
      );

      next();
    } catch (err) {
      next(err);
    }
  },
];

export const uploadAnnouncementFiles = [
  announcementUpload.array("files", 5),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.files?.length) return next();

      const files = req.files as Express.Multer.File[];

      req.body.attachments = await Promise.all(
        files.map((file) => {
          if (!file.mimetype.startsWith("image/")) {
            throw new Error("Only image files are allowed!");
          }
          return streamToCloudinary(file.buffer, "hazardwatch/announcements");
        }),
      );

      next();
    } catch (err) {
      next(err);
    }
  },
];

export const uploadProfilePicture = [
  profileUpload.single("avatar"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.file) return next();

      const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/webp",
      ];

      if (!allowedTypes.includes(req.file.mimetype)) {
        throw new Error("Invalid file type. Allowed: JPEG, PNG, WEBP");
      }

      req.body.avatarUrl = await streamToCloudinary(
        req.file.buffer,
        "hazardwatch/avatars",
      );

      next();
    } catch (err) {
      next(err);
    }
  },
];

export const multerErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res
        .status(400)
        .json({ message: "File too large. Max size is 10MB." });
    }
    if (err.code === "LIMIT_FILE_COUNT") {
      return res
        .status(400)
        .json({ message: "Too many files. Max is 5 files." });
    }
    return res.status(400).json({ message: err.message });
  }
  next(err);
};
