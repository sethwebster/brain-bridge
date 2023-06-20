import cors from "cors";
import nocache from "nocache";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import apiV1 from "./api-v1/index.js";
import * as errorHandler from "./helpers/errorHandler.js";
import home from "./home.js";
import http from 'http';
import { Server } from "socket.io";
import { messageRouter } from "./api-v1/sockets.js";
import { authorize } from '@thream/socketio-jwt'
class App {
  public express: express.Application;
  public io: Server;
  public server: http.Server;
  constructor() {
    this.express = express();
    this.server = http.createServer(this.express);
    this.setMiddlewares();
    this.setRoutes();
    this.catchErrors();
    this.setUpSockets();
  }


  private setMiddlewares(): void {
    this.express.use(cors());
    this.express.use(morgan("dev"));
    this.express.use(nocache());
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: true }));
    this.express.use(helmet());
    this.express.use(express.static("public"));
  }

  private setUpSockets() {
    console.log("Setting up sockets...")
    this.io = new Server(this.server, {
      cors: {
        origin: "*",
      }
    });
    this.io.use(
      authorize({
        secret: process.env.NEXTAUTH_SECRET,

        onAuthentication: async (decodedToken) => {
          console.log("THE TOKEN", decodedToken)
        }
      })
    )
    // TODO: Add authentication correctly
    // this.io.use((socket, next) => {
    //   const token = socket.handshake.auth.token;
    //   console.log("middleware token", token)
    //   next();
    // });
    this.io.on('connection', (socket) => {
      console.log('a user connected');
      messageRouter(socket, this.io)
      socket.on('disconnect', () => {
        console.log('user disconnected');
      });
    });


  }

  private setRoutes(): void {
    this.express.use("/", home);
    this.express.use("/v1", apiV1);
  }

  private catchErrors(): void {
    this.express.use(errorHandler.notFound);
    this.express.use(errorHandler.internalServerError);
  }
}

const app = new App();



export default {
  express: app.express,
  socket: app.io,
  server: app.server
}
