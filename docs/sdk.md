# UCG Auth SDK

## Primer

The main idea behind the `ucg-auth` package is to provide a more seamless interface for interaction between the ucg auth and ucg-rbac systems.  

With any kind of permission / security system, you have

- **Authentication** - The user is logged in
- **Authorization** - Controls what a user is allowed to do. 

## What it is

The `ucg-auth` package has two primary purposes:

1. Enrich the `better-auth` session object with roles / permissions defined in the ucg-auth system, and methods to interact utilize those roles.
2. Provide an easy way to define type-safe code that is synchronized with the ucg-auth permissions system. 

## How to use

_Note: You can do everything you would do with `better-auth` with `ucg-auth`. That being said, you should be treating your application's "auth" as simply having a single SSO / OIDC provider (The UCG Auth system).  Kind of like only having `sign in with Google` available_ 

### Register your application with the UCG-Auth system

You should use the `ucga` cli for this. Download / install the binary using the install script and login (you can refer to the cli documentation for instructions on how to do this). 

Change your working directory to the root of your application and run 

```shell
ucga init 
```
```
```

This will gather a few answers from you about your project like the name, base url, etc.

This will return an object with the following shape

```shell
{
  "id": <your_application_id>,
  "secret": <your_application_secret_key>
}
```

***This will be the only time this key will be accessible, so don't lose it.***

Save this secret key to your secrets file

```shell
UCG_AUTH_KEY=<your_application_secret_key>
```

```
```
### Create your auth.ts file

You can place this wherever your want.

```typescript
import { ucgAuth } from "ucg-auth-sdk"

export const auth = ucgAuth({
  applicationId: <your_application_id> // This is the "id" field returned by the `ucga init` operation
}) 
```
```
```

This sets up our basic auth configuration.

### Client-Side Auth

You can use the `authClient` object exported by `ucg-auth` to handle client side auth


