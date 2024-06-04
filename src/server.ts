import express, { NextFunction, Request, Response } from "express";
require('dotenv').config()
import bodyParser from 'body-parser';
import routes from './routes/index';
import connectDB from "./database/database";

const app = express();

app.use(bodyParser.json());


app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', '*')
    res.setHeader('Access-Control-Allow-Headers', '*')
    next()
})

app.use('/api', routes);

app.get("/api/health", async (req: Request, res: Response) => {
    return res.status(200).send({ status: "pong" });
});

app.use("*", async (req: Request, res: Response) => {
    return res.status(404).json({ code: 404, status: false, error: "API Not Found!" });
});

connectDB()
const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});