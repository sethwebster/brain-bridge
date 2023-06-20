import dotenv from "dotenv";

dotenv.config();

import { PrismaClient } from "@prisma/client";

import server from "./api.js";

const prisma = new PrismaClient();

const port = parseInt(process.env.API_PORT || "4141", 10);

server.server.listen(port, "0.0.0.0", () => {
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
