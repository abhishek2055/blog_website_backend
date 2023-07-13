import express from "express"
import bodyParser from 'body-parser';

import cors from 'cors'
const app = express() 

app.use(express.json());

app.use(cors())
app.use(bodyParser.json());

import postRoutes from "./routes/postRoutes.js" 
import authRoutes from "./routes/authRoutes.js"
import userRoutes from "./routes/userRoutes.js" 
import commentRoutes from "./routes/commentRoutes.js"
import likeRoutes from "./routes/likeRoutes.js"

import cookieParser from "cookie-parser";
import multer from "multer";  

const storage = multer.diskStorage({
  destination: function (req,file,cb){
    cb(null,'../frontend/public/upload')
  },
  filename: function (req,file,cb){
    cb(null,Date.now()+'-'+file.originalname) 
  }
})

const dpStorage = multer.diskStorage({
  destination: function (req,file,cb){
    cb(null,'../frontend/public/dps')
  },
  filename: function (req,file,cb){ 
    cb(null,Date.now()+'-'+file.originalname)
  }
})
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }))
app.use(cors());


const upload = multer({ storage })

app.post('/upload',upload.single('file'),(req,res)=>{
  const file = req.file
  res.status(200).json(file.filename)
  console.log(file.filename);
})

const uploadDp = multer({storage:dpStorage})
app.post('/uploadDp',uploadDp.single('displayPic'),(req,res)=>{
  const dp = req.file;
  res.status(200).json(dp.filename);
})

app.use("/api/posts",postRoutes);   
app.use("/api/auth",authRoutes);
app.use("/api/users",userRoutes); 
app.use("/api/comment",commentRoutes);
app.use("/api/likes",likeRoutes);

app.listen(8800,()=>{
    console.log("app is running in port 8800");
})