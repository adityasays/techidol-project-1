import express from "express";
import { Volunteer } from "../models/Volunteer.js";
import {Donation} from "../models/Donation.js";
import { BlogPost } from "../models/BlogPost.js";
import {Form} from '../models/Form.js';
import path,{dirname} from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const router = express.Router();

router.get("/create_form",(req,res)=>{
  res.sendFile(path.join(__dirname,"create_form.html"))
})

router.get("/blog",(req,res)=>{
  res.sendFile(path.join(__dirname,"blog.html"))
})

router.get("/volunteer", (req,res) =>{
  res.sendFile(path.join(__dirname,"volunteer.html"))
})

router.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname, "dashboardindex.html"))
})

router.post('/volunteer', async (req, res) => {
    const { name, region } = req.body;
  
    try {
      const newVolunteer = new Volunteer({
        name,
        region
      });
  
      await newVolunteer.save();
  
      res.status(201).send('Volunteer added successfully!');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });
  
  // Handle POST requests to '/donation' endpoint
    router.post('/donation', async (req, res) => {
    const { amount } = req.body;
  
    try {
      const newDonation = new Donation({
        amount
      });
  
      await newDonation.save();
  
      res.status(201).send('Donation added successfully!');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });
  
  router.get('/:region', async (req, res) => {
    const region = req.params.region;
  
    try {
      // Get region-specific data
      const regionVolunteerCount = await Volunteer.countDocuments({ region });
      // Add other region-specific queries as needed
  
      // Get overall data for India
      const totalVolunteerCount = await Volunteer.countDocuments();
      const totalDonationCount = await Donation.countDocuments();
      // Add other overall queries as needed
  
      // Send the data to the dashboard
      res.json({
        regionVolunteerCount,
        // Add other region-specific data
        totalVolunteerCount,
        totalDonationCount
        // Add other overall data
      });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });
  
  router.post('/blog', async (req, res) => {
    const { title, content, author } = req.body;
  
    try {
      const newBlogPost = new BlogPost({
        title,
        content,
        author
      });
  
      await newBlogPost.save();
  
      res.status(201).send('Blog post submitted successfully!');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });

  
  
  router.post("/create-form", async (req,res)=>{
  
    const newForm = new Form({
      Form_ID:new Date().getTime(),
      Form_Name:req.body.Form_Name,
      Full_Name:req.body.Full_Name,
      Father_Name:req.body.Father_Name,
      Qualification:req.body.Qualification,
      Occupation:req.body.Occupation,
      Email_Address:req.body.Email_Address,
      Phone_Number:req.body.Phone_Number,
      Birth_Date:req.body.Birth_Date,
      Gender:req.body.Gender,
      Address:req.body.Address,
      Aadhar_Card:req.body.Aadhar_Card,
      Marital_Status:req.body.Marital_Status,
  });
  
  await newForm.save();
  
  res.status(201).send('Form created successfully!');
  })
  

export default router;