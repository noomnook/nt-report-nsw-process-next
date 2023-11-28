import multer from "multer";
import express from "express";
import cors from "cors";
import md5 from "md5";
import mysql from "mysql";
import path from "path";

const listen_port = 3100;
const app = express();
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./../../../../assits/uploads");
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "_" + Date.now + path.extname(file.originalname));
    },
});

let upload = multer({ storage: storage });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

export const multerUpload = async (file: any) => {
    console.log("Service Upload");
    return { valid: true, status: "success" }
}

// app.use('/', (req, res) => {
//     res.status(404).send('<h1>404 Page not found</h1>');
// })

// app.listen(listen_port, () => {
//     console.log(`Server is running on port ${listen_port}`);
// })