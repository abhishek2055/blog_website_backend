import { db } from "../db.js";

export const addLike = (req, res) => {
//pahile check garam like vaisakexa ki nae
  const p = "SELECT * FROM likes WHERE liked_uid = ? AND liked_pid=?";
  db.query(p, [req.body.curr_id, req.body.post_id], (error, data) => {
    if (error) return res.json(error);
    if (data.length != 0) {
      return res.json("already liked");
    }
//like lai database ma rakheko
    const q = "INSERT INTO likes (`liked_uid`,`liked_pid`) VALUES (?,?)";
    db.query(q, [req.body.curr_id, req.body.post_id], (error, data) => {
      if (error) return res.json(error);
      return res.json(data);
    });
  });
};

export const deleteLike = (req, res) => {
    const q = "DELETE FROM likes WHERE liked_uid=? AND liked_pid=?";
  db.query(q, [req.body.curr_id, req.body.post_id], (error, data) => {
    if (error){
        return res.json(error);}
    return res.json(data);
      });
  
};

export const getLike = (req, res) => {
  return res.json("liked");
};

export const query = (req, res) => {
const q = "SELECT * FROM likes WHERE liked_uid=?"
db.query(q,[req.body.curr_id],(error,data)=>{
    if(error){
        return res.json(error)
    }
    return res.json(data)
})
};
