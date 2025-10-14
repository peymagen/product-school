import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { Strategy as LocalStrategy } from "passport-local";
import createError from "http-errors";
import * as userService from "../../api/user/user.service";
import { type Request } from "express";
import { type IUser } from "../../api/user/user.dto";

const isValidPassword = async function (value: string, password: string) {
  const compare = await bcrypt.compare(value, password);
  return compare;
};
export const initPassport = (): void => {
  passport.use(
  new Strategy(
    {
      secretOrKey: process.env.JWT_SECRET ?? "",
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    async (payload, done) => {
      try {
        // Attach user and role to req.user
        done(null, { id: payload.id, email: payload.email, role: payload.role });
      } catch (error) {
        done(error);
      }
    }
  )
);


  // user login
  passport.use(
    "login",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        
      },
      async (email, password, done) => {
        try {
          const dbUser = await userService.getActiveUserByEmail(email);
          if (!dbUser) {
            done(createError(401, "User not found!"), false);
            return;
          }
          const user = dbUser as IUser;

          // const user = await userService.getUserByEmail(email);
          if (user == null) {
            done(createError(401, "User not found!"), false);
            return;
          }

          const validate = await isValidPassword(password, user.password ?? "");
          console.log(validate);
          if (!validate) {
            done(createError(401, "Invalid email or password"), false);
            return;
          }
          const { password: _p, ...result } = user;
          done(null, result, { message: "Logged in Successfully" });
        } catch (error: any) {
          done(createError(500, error.message));
        }
      }
    )
  );
};

export const createUserTokens = (user: Omit<IUser, "password">) => {
  const jwtSecret = process.env.JWT_SECRET ?? "";
  const payload = {
    id: user.id,
    email: user.email,
    role: user.role,
  };
  const token = jwt.sign(payload, jwtSecret);
  return { accessToken: token, refreshToken: "" };
};


export const decodeToken = (token: string) => {
  // const jwtSecret = process.env.JWT_SECRET ?? "";
  const decode = jwt.decode(token);
  return decode as IUser;
};



// Passport
// Think of Passport as a bouncer at a nightclub. 🕴️ When a user tries to access a protected route (like their profile page), Passport steps in and asks for their credentials.
// Instead of writing all the logic to handle usernames/passwords, Google logins, or API tokens yourself, Passport handles it for you in a clean, modular way.
// The key concept in Passport is the "strategy". A strategy is a self-contained module that handles a specific way of authenticating. For example:
// passport-local: Handles traditional username and password logins.
// passport-google-oauth20: Handles logging in with a Google account.
// passport-jwt: Handles authentication using a JSON Web Token (JWT).
// You can use one or many of these strategies in the same application.
// ## How It's Used
// In a typical Express application, you would:
// Configure Passport with the strategy (or strategies) you want to use.
// Apply it as middleware to the routes you want to protect.





// import { Strategy, ExtractJwt } from "passport-jwt";
// This line imports tools for handling JWT (JSON Web Token) authentication. This is a common method for securing APIs.

// Strategy: This is the main class that lets you define the logic for verifying a JWT. You'll use it to check if a token is valid and not expired.

// ExtractJwt: This is a helper object that provides different methods to get the JWT from an incoming request. For example, ExtractJwt.fromAuthHeaderAsBearerToken() tells Passport to look for the token in the Authorization header.



// import { Strategy as LocalStrategy } from "passport-local";
// This import is for handling a traditional username and password login.
// Strategy as LocalStrategy: This imports the strategy for local authentication. It's renamed to LocalStrategy using the as keyword to avoid a name conflict with the Strategy imported from passport-jwt. This strategy's job is to take a username and password from a request body and verify them against a database.