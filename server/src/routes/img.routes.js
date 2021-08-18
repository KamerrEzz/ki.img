const { Router } = require('express');
const fs = require('fs');
const multer = require('multer');
const path = require('path');
const router = Router();

const storage = multer.diskStorage({
    destination: path.join(__dirname, "../public/img"),
    filename: (req, file, cb) => {
        cb(null, "ki.img-" + Date.now() + "-" + file.originalname)
    }
})
const uploadImg = multer({
    storage,
    limits: { fileSize: 1000000 },
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif/;
        const minetype = filetypes.test(file.mimetype)
        const extname = filetypes.test(path.extname(file.originalname));
        if (minetype && extname) {
            return cb(null, true)
        } else {
            cb("Debe ser una imagen")
        }
    }
}).single("img")


// var upload = multer({
//     storage: storage,
//     fileFilter: (req, file, cb) => {
//         if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
//             cb(null, true);
//         } else {
//             cb(null, false);
//             return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
//         }
//     }
// });

router
    .get('/', (req, res) => {
        fs.readdir('./src/public/img', (err, data) => {


            res.status(200).json({
                status: 200,
                data
            })

        })
    })
    .post('/upload', (req, res) => {
        uploadImg(req, res, (err) => {
            if (err) {
                console.log(err);
            }
            console.log(req.file);
            res.send(req.file.filename)
        });
    })
    .get('/:id', (req, res) => {
        fs.readdir('./src/public/img', (err, data) => {


            res.status(200).json({
                status: 200,
                data
            })

        })
    })
module.exports = router