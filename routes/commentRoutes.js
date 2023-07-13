import express from 'express'

const router = express.Router();
import { addComment,getComment } from '../controllers/commentController.js';


router.post('/add',addComment)
router.get('/get/:id',getComment)


export default router