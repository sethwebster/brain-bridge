import * as jwks from "jwks-rsa";
import { expressjwt as jwt } from "express-jwt";

var jwtAuthCheck = jwt({
  secret: process.env.NEXTAUTH_SECRET,
  audience: process.env.APP_BASE_URL, // "http://localhost:5000",
  issuer: process.env.AUTH0_ISSUER_BASE_URL, // "https://fabianferno.us.auth0.com/",
  algorithms: ["RS256"],
});

export default jwtAuthCheck;
