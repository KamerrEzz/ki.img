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
                return res.status(404).json({
                    status: 400,
                    err
                })
            } else {
                return res.status(200).json({
                    status: 200,
                    data: req.file.filename
                })
            }
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