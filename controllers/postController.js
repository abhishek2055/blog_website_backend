import { db } from "../db.js";
export const getPosts = (req, res) => {
  const q = req.query.cat
    ? "SELECT `username`,`title`,`cat`,`description`,`date`,`likes`, p.img as postImg,p.id as id ,u.img as userImg,count(liked_pid) as liked_id,GROUP_CONCAT(liked_uid) AS liked_uid FROM posts p JOIN users u  on u.id=p.uid LEFT JOIN likes l on p.id=l.liked_pid WHERE cat=? GROUP BY `username`, `title`, `cat`, `description`, `date`, `likes`, p.img, p.id, u.img "
    : "SELECT `username`,`title`,`cat`,`description`,`date`,`likes`, p.img as postImg,p.id as id ,u.img as userImg,count(liked_pid) as liked_id,GROUP_CONCAT(liked_uid) AS liked_uid FROM posts p JOIN users u on u.id=p.uid LEFT JOIN likes l on p.id=l.liked_pid GROUP BY `username`, `title`, `cat`, `description`, `date`, `likes`, p.img, p.id, u.img";
  db.query(q, [req.query.cat], (err, data) => {
    if (err){
        console.log(err);
        return res.send(err);}

    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.setHeader("Pragma", "no-cache");

    res.setHeader("Expires", "0");
        return res.status(200).json(data);
  });
};
export const getPost = (req, res) => {
  const q =
    "SELECT `username`,`title`,`cat`,`description`,`date`,uid, p.img as postImg,p.id as id ,u.img as userImg FROM users u JOIN posts p on u.id=p.uid WHERE p.id = ?";
  db.query(q, [req.params.id], (error, data) => {
    if (error) return res.send(error);
    return res.status(200).json(data[0]);
  });
};
export const addPost = (req, res) => {
  const { title, description, img, cat, date, userId } = req.body;
  const q =
    "INSERT INTO posts (`title`, `description`, `img`, `cat`, `date`, `uid`) VALUES (?,?,?,?,?,?);";
  db.query(q, [title, description, img, cat, date, userId], (error, data) => {
    if (error) return res.send(error);
    // else console.log(data);

    return res.json(data);
  });
};

export const deletePost = (req, res) => {
  const q = "DELETE FROM comments WHERE post_id=?;";
  db.query(q, [req.params.pid], (error, data) => {
    if (error) {
      return res.json(error);
    }
    const qy = "DELETE FROM posts WHERE `id`=? AND `uid`=?;";
    db.query(qy, [req.params.pid, req.params.uid], (error, data) => {
      if (error) {
        return res.json(error);
      }
      return res.status(200).json(data);
    });
  });
};

// export const deletePost = (req,res)=>{
//     // const q = "DELETE FROM comments WHERE post_id=?; DELETE FROM posts WHERE `id`=? AND `uid`=?;";
//     const q = "DELETE FROM comments WHERE post_id=?;"
//     db.query(q,[req.params.pid],(error,data)=>{
//         if(error){
//             return res.json(error);
//         }
//         return res.status(200).json(data);
//     })
//     const qy = "DELETE FROM posts WHERE `id`=? AND `uid`=?;;"
//     db.query(qy,[req.params.pid,req.params.uid],(error,data)=>{
//         if(error){
//             return res.json(error);
//         }
//         return res.status(200).json(data);
//     })

//     //yo aaile vaxaina kinaki token gayera basexaina
//     // const token = req.cookies.access_token
//     // console.log(token);
//     // if(!token) return res.status(401).json("Not Authenticated");

//     // Jwt.verify(token,"jwtkey",(err,userInfo)=>{
//     //     if(err) return res.status(403).json("Token is not valid")
//     //     const postId = req.params.id;

//     //     const q = "DELETE FROM posts WHERE `id`=? AND `uid` = ?"

//     //     db.query(q,[postId,userInfo.id],(error,data)=>{
//     //         if(error) return res.send(error);
//     //         return res.status(200).json(data)
//     // })

//     // })

// }
export const updatePost = (req, res) => {
  const q =
    "UPDATE posts SET title = ?, description = ?, cat = ?, img = ? WHERE id = ?";
  const id = req.params.id;
  const { title, description, cat, img } = req.body;
  db.query(q, [title, description, cat, img, id], (error, data) => {
    if (error) {
      return res.json(error);
    }
    return res.status(200).json(data);
  });
};
