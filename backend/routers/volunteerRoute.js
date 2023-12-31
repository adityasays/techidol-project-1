import express from "express";
import { Volunteer } from "../models/Volunteer.js";
import {Donation} from "../models/Donation.js";
import path,{dirname} from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const router = express.Router();

router.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"volunteerIndex.html"))
});

router.get('/api', async (req, res) => {
    try {
      const volunteers = await Volunteer.find();
  
      res.json(volunteers);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });

export default router;