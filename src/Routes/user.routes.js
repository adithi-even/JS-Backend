import {registerUser} from '../controllers/user.controller.js';
import {Router} from 'express';
import { upload } from '../middleware/multer.js';

const router = Router();    

router.route("/register").post(

    //injecting the middleware
    upload.fields([ //since we are using the 2 upload files so are the 2 objects
        {
            name : "avatar",
            maxCount: 1
        },{
            name: "coverImage",
            maxCount: 1
        }
    ]),
    registerUser
)

//since the code in the line 7th is the normal route code ,
// but in this scenario we have a file uplaod feature so we are using the middleware (multer)- as the whole multer code is from the docs and is assigned to the "upload variable" so we are using the functionalities of the multer through the "upload variable"  , since we are putting the multer in between the router and post so that whatever the data is posted into the backend it is gonna meet with the middleware (multer i.e., code from 9-17) and also teh upload method do have various methods inside of it and we are again using all those as required.
// and also if we want to add the multiple files into the db then we have to store multiplly , as we cannot use the array methos for upload.array because it takes and stores all the multiple data into the same field, so we are using upload.fields because it takes the multiple files associated with the given form fields

export default router