import * as dotenv from "dotenv";
dotenv.config();

import server from "./api";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const port = parseInt(process.env.API_PORT || "4141", 10);


server.listen(port, "0.0.0.0", () => {
  console.log(
    `The API server has successfully started. \nListening at ${process.env.APP_BASE_URL || `http://0.0.0.0:${process.env.API_PORT || "4141"}`
    }`
  );
});

process.on("SIGINT", function () {
  prisma.$disconnect(); // Disconnect from Prisma
  console.log("Prisma Disconnected.");
  process.exit(0);
});
