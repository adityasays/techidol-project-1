import express from "express";
import { User } from "../models/User.js";
import path,{dirname} from 'path';
import { fileURLToPath } from 'url';
import jwt from 'jsonwebtoken';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const router = express.Router();

const maxAge = 3 * 24 * 60 * 60 * 1000;

const cookieOptions = {
  expires: new Date(Date.now() +  maxAge),
  httpOnly: false,
}

// create json web token
const createToken = (id) => {
  return jwt.sign({ id }, 'net ninja secret', {
    expiresIn: maxAge
  });
};

router.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"login.html"))
});

router.post("/",async (req,res)=>{
    const {email,password} = req.body;

    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt',token,cookieOptions)

        res.status(200).json({ user: user._id });
      } catch (err) {
        res.status(400).json({err});
      }

})

router.post("/register", async(req,res)=>{
    const {email,password} = req.body;

    try {
        const user = await User.create({email,password});
        res.status(400).json(user)
    } catch (error) {
        console.log(error);
        res.status(400).send("User not Created")
    }

    res.send("User Registered")
})


export default router;