const express = require('express');
const hbs = require('express-handlebars');
const app = express();
const multer = require('multer');
const path = require('path');
const port = process.env.PORT ? process.env.PORT : 3000;

// --== ==--

// --== ==--

app
.set('view engine', '.hbs')
.set('views', path.join(__dirname, "view"))
.engine('.hbs', hbs({
    defaultLayout: "main",
    extname: ".hbs"
}))
.use(express.static(path.join(__dirname, 'public')))

// middlerwares

// --== ==--
.use(require('./routes/index'))

// --== ==--
.listen(port, () => {
    console.log("App listening on port " + port)
})