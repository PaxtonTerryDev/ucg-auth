import { Layout } from "./layout";

export const Consent = () => (
  <Layout title="Authorize Access">
    <div class="card">
      <div class="app-info">
        <div class="app-icon">🔑</div>
        <div>
          <div class="app-name">Application Name</div>
          <div class="app-domain">app.example.com</div>
        </div>
      </div>
      <h1>Authorize access</h1>
      <p class="subtitle">This application is requesting access to your account</p>
      <ul class="scope-list">
        <li class="scope-item">Read your profile information</li>
        <li class="scope-item">Access your email address</li>
      </ul>
      <form method="post" action="/api/auth/oauth2/consent">
        <div class="consent-actions">
          <button type="submit" name="action" value="deny" class="btn-deny">Deny</button>
          <button type="submit" name="action" value="allow" class="btn-primary">Allow</button>
        </div>
      </form>
    </div>
  </Layout>
);
