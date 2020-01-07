import "./env";
import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { prisma } from "../generated/prisma-client";

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
};

//4. payload는 토큰에서 해석된 id로 user를 찾아서 리턴함.
const verifyUser = async (payload, done) => {
  try {
    const user = await prisma.user({ id: payload.id });
    if (user !== null) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch {
    return done(error, false);
  }
};

//1. authenticateJwt함수는 passport.authenticate("jwt")함수를 실행함.
//5. 콜백 함수가 실행되고 user를 req에 추가함.
//6. server.js에서 context에 request를 담아줌.
export const authenticateJwt = (req, res, next) =>
  passport.authenticate("jwt", { session: false }, (error, user) => {
    if (user) {
      req.user = user;
    }
    next();
  })(req, res, next);

//2. passport.authenticate("jwt")함수는 Strategy로 jwt토큰을 추출함.
//3. 토큰이 추출되면 verifyUser를 payload와 함께 실행함.
passport.use(new Strategy(jwtOptions, verifyUser));
passport.initialize();