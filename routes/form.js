import express from "express";

const routers = express.Router();
import path from 'path';
const __dirname = path.resolve();

routers.get('/', (req, res)=> {
    res.sendFile(__dirname + "/views/index.html");
})

export default routers;