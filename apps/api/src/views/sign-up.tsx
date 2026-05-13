import { Layout } from "./layout";

export const SignUp = ({ oauthQuery }: { oauthQuery?: string }) => (
  <Layout title="Sign Up">
    <div class="card">
      <h1>Create an account</h1>
      <p class="subtitle">Enter your details below to create your account</p>
      <form method="post" action="/api/auth/sign-up/email">
        <div class="field">
          <label for="name">Name</label>
          <input type="text" id="name" name="name" placeholder="John Doe" required />
        </div>
        <div class="field">
          <label for="email">Email</label>
          <input type="email" id="email" name="email" placeholder="m@example.com" required />
        </div>
        <div class="field">
          <label for="password">Password</label>
          <input type="password" id="password" name="password" required />
        </div>
        <div class="field">
          <label for="confirm-password">Confirm Password</label>
          <input type="password" id="confirm-password" name="confirmPassword" required />
        </div>
        {oauthQuery && <input type="hidden" name="oauth_query" value={oauthQuery} />}
        <div class="actions">
          <button type="submit" class="btn-primary">Create Account</button>
        </div>
      </form>
      <p class="footer">Already have an account? <a href="/sign-in">Sign in</a></p>
    </div>
  </Layout>
);
