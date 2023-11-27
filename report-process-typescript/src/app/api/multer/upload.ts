const express = require('express')
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const app = express()

app.post('/file', upload.single('report'), function (req: any, res: any, next: any) {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
  })