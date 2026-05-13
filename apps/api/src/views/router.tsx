import { Hono } from "hono";
import { SignIn } from "./sign-in";
import { SignUp } from "./sign-up";
import { Consent } from "./consent";

export const views = new Hono();

views.get("/sign-in", (c) => c.html(<SignIn oauthQuery={c.req.query("oauth_query")} />));
views.get("/sign-up", (c) => c.html(<SignUp oauthQuery={c.req.query("oauth_query")} />));
views.get("/consent", (c) => c.html(<Consent />));
