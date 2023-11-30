import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {  // destination to save the files on diskstorage
      cb(null, "./public/temp")
    },
    filename: function (req, file, cb) {  // cb is callback function, and file accessd only multer
      
      cb(null, file.originalname)
    }
  })

  
  
export const upload = multer({ 
    storage, 
})
