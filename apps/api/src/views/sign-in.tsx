import { Layout } from "./layout";

export const SignIn = ({ oauthQuery }: { oauthQuery?: string }) => (
  <Layout title="Sign In">
    <div class="card">
      <h1>Login to your account</h1>
      <p class="subtitle">Enter your email below to login to your account</p>
      <form method="post" action="/api/auth/sign-in/email">
        <div class="field">
          <label for="email">Email</label>
          <input type="email" id="email" name="email" placeholder="m@example.com" required />
        </div>
        <div class="field">
          <div class="field-header">
            <label for="password">Password</label>
            <a href="/forgot-password" class="forgot">Forgot your password?</a>
          </div>
          <input type="password" id="password" name="password" required />
        </div>
        {oauthQuery && <input type="hidden" name="oauth_query" value={oauthQuery} />}
        <div class="actions">
          <button type="submit" class="btn-primary">Login</button>
          <button type="button" class="btn-secondary">Login with Google</button>
        </div>
      </form>
      <p class="footer">Don't have an account? <a href="/sign-up">Sign up</a></p>
    </div>
  </Layout>
);
