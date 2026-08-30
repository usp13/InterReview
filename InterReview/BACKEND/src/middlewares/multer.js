import multer from "multer";

// const storage = multer.diskStorage({

//     destination: function(req, file , cb ){
//         cb( null , 'public')
//     },
//     filename: function( req, file , cb ){
//         const filename = Date.now() + "_" + file.originalname ;
//         cb( null , filename )
//     }
// })

import path from "path";

const storage = multer.diskStorage({
   
    destination(req, file, cb) {
        cb(null, path.join(process.cwd(), "src", "public"));
    },

    filename(req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});


export const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB Limit 
}); 