import cors from 'cors'
import express from 'express'
import dotenv from "dotenv";

dotenv.config();
import server from "./api.js";
import { PrismaClient } from 'database';

const prisma = new PrismaClient();


const app = express()
const port = parseInt(process.env.API_PORT || "4141", 10);

app.use(cors({ origin: 'http://localhost:3000' }))

server.server.listen(port, "0.0.0.0", () => {
  console.log(
    `The API server has successfully started. \nListening at ${process.env.APP_BASE_URL || `http://0.0.0.0:${process.env.API_PORT || port}`
    }`
  );
});

process.on("SIGINT", function () {
  prisma.$disconnect(); // Disconnect from Prisma
  console.log("Prisma Disconnected.");
  process.exit(0);
});
