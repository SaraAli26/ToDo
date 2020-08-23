const express = require('express');
const app = express();
const port = 3000;
const Notee = require('./models/note.model.js');
const bodyParser = require("body-parser");
const path = require("path");
const multer  = require('multer');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'images');
  },
  filename: (req, file, cb) => {
      console.log(file);
      cb(null, Date.now() + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
      cb(null, true);
  } else {
      cb(null, false);
  }
}
const upload = multer({ storage: storage, fileFilter: fileFilter });


//Upload route
app.post('/upload', upload.single('image'), (req, res, next) => {
  try {s

    var imagename = req.file.filename;
    var title = req.body.title;
    var body = req.body.body;
    var date = req.body.date;

     
    Notee.sync({ force: false }).then(() => {
      // Users table in the database corresponds to the model definition
      return Notee.create({
        Title: title,
        Body: body,
        deadlinedate: date,
        Image: imagename
      });
    });

      return res.status(201).json({
          message: 'Data Sent successfully'
      });
  } catch (error) {
      console.error(error);
  }
});


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});
app.get('/notes', function(req, res) {
  Notee.findAll().then(notes => res.json(notes));
});
app.use(express.static(__dirname + '/CSS'));


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
