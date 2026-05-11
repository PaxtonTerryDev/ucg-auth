import type { Child } from "hono/jsx";

const css = `
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    background: #0d0d0d;
    color: #f0f0f0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .card {
    background: #1c1c1e;
    border-radius: 14px;
    padding: 36px 32px;
    width: 100%;
    max-width: 360px;
  }

  h1 {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 6px;
  }

  .subtitle {
    color: #8e8e93;
    font-size: 14px;
    line-height: 1.4;
    margin-bottom: 28px;
  }

  .field {
    margin-bottom: 16px;
  }

  .field-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 8px;
  }

  label {
    display: block;
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 8px;
  }

  .field-header label {
    margin-bottom: 0;
  }

  a.forgot {
    font-size: 13px;
    color: #8e8e93;
    text-decoration: none;
  }

  a.forgot:hover {
    color: #c7c7cc;
  }

  input[type="email"],
  input[type="password"],
  input[type="text"] {
    width: 100%;
    background: #2c2c2e;
    border: 1px solid #3a3a3c;
    border-radius: 10px;
    color: #f0f0f0;
    font-size: 15px;
    padding: 11px 14px;
    outline: none;
    transition: border-color 0.15s;
  }

  input:focus {
    border-color: #636366;
  }

  input::placeholder {
    color: #48484a;
  }

  .actions {
    margin-top: 24px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  button {
    width: 100%;
    border-radius: 10px;
    border: none;
    cursor: pointer;
    font-size: 15px;
    font-weight: 500;
    padding: 12px;
    transition: opacity 0.15s;
  }

  button:hover {
    opacity: 0.85;
  }

  .btn-primary {
    background: #e8e8ed;
    color: #1c1c1e;
  }

  .btn-secondary {
    background: #2c2c2e;
    color: #f0f0f0;
    border: 1px solid #3a3a3c;
  }

  .btn-deny {
    background: #2c2c2e;
    color: #ff453a;
    border: 1px solid #3a3a3c;
  }

  .footer {
    text-align: center;
    font-size: 14px;
    color: #636366;
    margin-top: 20px;
  }

  .footer a {
    color: #f0f0f0;
    text-decoration: underline;
    text-decoration-color: #636366;
  }

  .app-info {
    display: flex;
    align-items: center;
    gap: 14px;
    margin-bottom: 24px;
  }

  .app-icon {
    width: 48px;
    height: 48px;
    background: #2c2c2e;
    border: 1px solid #3a3a3c;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
    flex-shrink: 0;
  }

  .app-name {
    font-weight: 600;
    font-size: 16px;
  }

  .app-domain {
    font-size: 13px;
    color: #8e8e93;
    margin-top: 2px;
  }

  .scope-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 28px;
  }

  .scope-item {
    background: #2c2c2e;
    border: 1px solid #3a3a3c;
    border-radius: 8px;
    padding: 10px 14px;
    font-size: 14px;
    color: #c7c7cc;
  }

  .consent-actions {
    display: flex;
    gap: 10px;
  }

  .consent-actions button {
    flex: 1;
  }
`;

type LayoutProps = {
  title: string;
  children?: Child;
};

export const Layout = ({ title, children }: LayoutProps) => (
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>{title} — UCG Auth</title>
      <style dangerouslySetInnerHTML={{ __html: css }} />
    </head>
    <body>
      {children}
    </body>
  </html>
);
