import express from 'express'
const router = express.Router();

import { addLike,deleteLike ,getLike,query} from '../controllers/likeController.js';

router.post('/add',addLike);
router.delete('/delete',deleteLike);
router.post ('/query',query)
router.get('/get',getLike);



export default router