const { Router } = require('express');
const router = Router();
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const base_url = "http://localhost:3000/img"
// 

const storage = multer.diskStorage({
    destination: path.join(__dirname, "../public/img"),
    filename: (req, file, cb) => {
        let random = Math.floor(Math.random() * 100) + 1;
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
// 

router
    .get('/', (req, res) => {
        res.render('main')
    })
    .post('/upload', (req, res) => {
        uploadImg(req, res, (err) => {
            if (err) {
                console.log(err);
            }
            console.log(req.file);

            res.render("modal", {
                url: `${base_url}/${req.file.filename}`,
                embed: `<img src="${base_url}/${req.file.filename}"`
            })
        });
    })

    .get('/img', (req, res) => {
        fs.readdir('./src/public/img', (err, data) => {
            

            res.render('img',{
                url: `${base_url}/<ID>`,
               data
            })
        })
        
    })
module.exports = router;