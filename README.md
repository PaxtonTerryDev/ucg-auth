# UCG Auth

`UCG Auth` acts as a singular OAuth / OIDC / RBAC provider for county applications. This provides several benefits -

1. Authentication is centralized, so users have the same "Account" across all county applications that use the system.
2. We can leverage Social Sign On providers (like Google, Azure AD, Github, etc) without needing to set up applications / configurations for every single county application.
3. We can unify permissions across different applications. Permission groups remain outside application code, so user's can be granted or revoked permissions at run time.
4. Built in auditing to see

- when a user performs an action
- what action was performed
- where / what device the action was performed on
- when the action was performed.
- any relevant data you want to include.

5. Pre-built user management. You no longer need to define interfaces that will allow admins of your application to manage users - simply link them to the applications permissions page.
6. Ability to mock / impersonate users - as a developer, you can see "become" a specific user and view things as they do to help with debugging
7. Directly debug auth issues - mock sessions so you don't need to go through third-party OAuth providers.

## Structure

The authentication system is a headless `hono` server (defined in the `api/` directory).

All source code is defined in the `src/` directory.

### Src/

#### API src/api

The `api` directory is the core auth server. All authentication requests will run through this server.

#### CLI - src/cli

The code in `cli/` is a small local cli you can use to interact with the production auth system. This is distrubuted with the `sdk`. This will allow you as the developer to

- register your application and update any of it's details
- interact with the rbac system
- manage user sessions
- synchronize your production rbac configuration with the ucg-auth sdk

Functionally, this is just a wrapper application that makes fetch requests to the production api server. IE, all functionality with the cli can be done through the api -> it just makes it a little more convenient.

#### Database - src/database

The database configuration for the auth system. This uses Prisma as an ORM.

This also exposes a set of functionality that abstracts interaction with the database. I believe this is commonly referred to as the `repository` pattern. Basically, these are abstractions on top of the prisma methods that you can use to simplify access to the data layer.

#### SDK - src/sdk

A small utility package for use in client / consumer applications. This basically wraps the `Better-Auth` client and exposes a small set of tools for validation and interaction with the rbac system. You can read more about this in the src/sdk/README.md file.

#### Schemas - src/schemas

These are `zod` schemas shared between the different applications. Normally, we only validate when data is being passed `over the wire`, or over an http request.

## A Few Notes

### Why Deno?

I decided to use Deno as the runtime for this application for several reasons.

1. We get first-class typescript support
2. We don't need to manage build / bundlers (except in the sdk, which is a very simple tsup export)
3. We have a built in test runner, making CI much simpler
4. Access to Deno's std library, removing many utility package dependencies (dotenv, lodash, etc.).
5. Standard version management.
6. Built in task runner with task dependency management.

## Getting Started

You can get a development environment up and running pretty quickly.

Make sure you have Deno installed. If you don't have it installed, you can follow the [Deno installation docs](https://docs.deno.com/runtime/getting_started/installation/).
If you haven't used Deno before, it's pretty similar to Node, but I would recommend reading through the first few pages of documentation to get a general idea of what you can do with it.
Once you have the runtime installed, should be able to run any of the `dev` commands that can be found in `deno.json` under the "tasks" section.

```shell
deno run api:dev # Starts up a local instance of the api
```

You can find more specific documentation for each "module" inside each of the `src/` sub-directories (they all should have their own `README.md` that explains how the module works / is structured)

## Common Pitfalls
