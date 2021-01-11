const multer = require("multer");
const cloudinary = require("cloudinary");
const streamifier = require("streamifier");
const sharp = require("sharp");

const multerStorage = multer.memoryStorage();

// using multer filter to filter down the files and only acepet images
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("please upload an image", 400), false);
  }
};

// using multer to build an upload image midllwear
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

// using sharp to resize the user photo and also convert it to buffer and save it to req.file
const resizeUserPhoto = async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

  const processedImage = await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toBuffer({ resolveWithObject: true });

  //saving the buffer to a new file object
  req.file.processedImage = processedImage;

  next();
};

const resizePostPhoto = async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

  const processedImage = await sharp(req.file.buffer)
    .resize(110, 800)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toBuffer({ resolveWithObject: true });

  //saving the buffer to a new file object
  req.file.processedImage = processedImage;

  next();
};

// using cloudinary to upload images as a buffer and save it to the cloud
let uploadFromBuffer = (buffer) => {
  return new Promise((resolve, reject) => {
    let cld_upload_stream = cloudinary.v2.uploader.upload_stream(
      {
        folder: "leanr-auth-app",
      },
      (error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    );

    streamifier.createReadStream(buffer).pipe(cld_upload_stream);
  });
};

// using cloudinary to delete an image from the cloud
let deleteImage = (imageId) => {
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.destroy(imageId, (error, result) => {
      if (result) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};

module.exports.upload = upload;
module.exports.resizeUserPhoto = resizeUserPhoto;
module.exports.resizePostPhoto = resizePostPhoto;
module.exports.uploadFromBuffer = uploadFromBuffer;
module.exports.deleteImage = deleteImage;
