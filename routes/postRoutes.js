import express from "express";

import {addPost, deletePost, getPost, getPosts, updatePost} from '../controllers/postController.js'

const router = express.Router();

router.get('/',getPosts)
router.get('/:id',getPost)
router.post('/',addPost)
router.delete('/:pid/:uid',deletePost)
router.delete('/:pid',deletePost)
router.put('/:id',updatePost)



export default router