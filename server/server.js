import dotenv from "dotenv";
import express from "express";
import passport from "passport";
import session from "express-session";
import GoogleStrategy from "passport-google-oauth20";
import cors from "cors";
import pdfRoutes from "./routes/pdf.routes.js";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

//google auth

app.use(
  session({
    secret: "anudeepavula",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    const user = {
      displayName: req.user.displayName,
      email: req.user.emails[0].value,
    };

    res.redirect(
      `http://localhost:5173/profile?user=${encodeURIComponent(
        JSON.stringify(user)
      )}`
    );
  }
);

app.get("/api/profile", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ user: req.user });
  } else {
    res.status(401).json({ error: "User not authenticated" });
  }
});

app.get("/logout", (req, res) => {
  req.logout(() => {
    res.redirect("http://localhost:5173");
  });
});

app.get("/", (req, res) => {
  res.send("server running...");
});

//routes

app.use("/api", pdfRoutes);

app.listen(3000, () => {
  console.log(`Server is running at port http://localhost:3000`);
});
