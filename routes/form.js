import express from "express";

const routers = express.Router();
import path from 'path';
// const __dirname = path.resolve();

routers.get("/", (req, res)=>{
    res.render("index");
})

export default routers;