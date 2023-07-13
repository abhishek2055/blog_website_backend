import { db } from "../db.js"
export const addComment = (req,res)=>{
    const {comment,curr_uid,post_id} = req.body;
    const q = "INSERT INTO comments (`comment`,`user_id`,`post_id`) VALUES (?,?,?)";
    db.query(q,[comment,curr_uid,post_id],(error,data)=>{
        if(error) return res.json(error)
       return res.json(data)
    })
}

export const getComment = (req,res)=>{
    const id = req.params.id;
    // const q = "SELECT * FROM comments WHERE post_id=? AND parent IS NULL";
    // const q = "SELECT c.`comment`, c.`date`, u.`username`, u.`image` FROM comments c JOIN users u ON c.`user_id` = u.`id` WHERE c.`post_id` = ? AND c.`parent` IS NULL";
    const q = "SELECT `comment`,`date`,`username`,`img` FROM comments c JOIN users u on c.user_id=u.id WHERE post_id=? AND parent IS NULL"
    db.query(q,[id],(error,data)=>{
        if(error) return res.json(error);
      return  res.json(data)
    })

}