//this whole code is from the DOCS

import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {  // file(parameter) is already present in the multer so that we can use it to store the file
      cb(null, "./public/temp")  //cb = call back
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)  //minor functionalities make it a good practice and ask gpt
    }
  })
  
  export const upload = multer({ 
    storage,
 })

