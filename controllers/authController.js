import { db } from "../db.js"

import bcrypt from "bcryptjs"

import jwt from 'jsonwebtoken'

export const register = (req, res) => {
    const { username, email, password,dpUrl } = req.body;
    //check Existing User
    const q = "SELECT * FROM users WHERE email = ? OR username = ?"
    db.query(q, [email, username], (err, data) => {
        if (err) {
            return res.json(err)
        }
        if (data.length != 0) {
            return res.status(409).json("user already exists");
        }
        // hash the password and create a user
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        const i = "INSERT INTO users (username,email,password,img) VALUES (?,?,?,?)"
        db.query(i, [username, email, hash,dpUrl], (err, data) => {
            if (err) { return res.json(err); }
            else {
                return res.status(200).json("user has been created.");
            }

        })
    })
}

export const login = (req, res) => {
    //check user
    const q = "SELECT * FROM users WHERE username = ?"
    db.query(q,[req.body.username], (error, data) => {
        
        if (error) {
            return res.json(error);
        }
        if (data.length === 0) {
            return res.status(404).json("user not found");
        }
        //check password
        const isPasswordCorrect = bcrypt.compareSync(req.body.password, data[0].password); // true
        if (!isPasswordCorrect) {
            return res.status(400).json("Wrong username or Password")
        }
        // const token = jwt.sign({id: data[0].id},"jwtkey");
        const {password, ...other} = data[0];
        
        // res.status(202).cookie('access-token',token,{
        //     sameSite: 'strict',
        //     path: '/',
        //     httpOnly: true,
            

        // }).json(other)

        res.json(other)

      })

}

export const logout = (req, res) => {

    res.clearCookie("access_token",{
        sameSite: "none",
        secure:true
    }).status(200).json("User has been logged out")
} 