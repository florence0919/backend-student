const multer = require("multer")
const path = require("path")

// Store files in /uploads with original filename + timestamp
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/")
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname)
  }
})

const fileFilter = (req, file, cb) => {
  // Only allow images
  const ext = path.extname(file.originalname)
  if (ext === ".png" || ext === ".jpg" || ext === ".jpeg") {
    cb(null, true)
  } else {
    cb(new Error("Only images are allowed"))
  }
}

const upload = multer({ storage, fileFilter })

module.exports = upload