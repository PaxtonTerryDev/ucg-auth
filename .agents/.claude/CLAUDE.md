# UCG OAuth

This is going to be a private OAuth / OIDC / IDP server using Better Auth, and more specifically, the better-auth OAuth Provider plugin. You can find a reference to the better-auth documentation in the root llms.txt file.

On top of this, we are going to be building a general purpose rbac system using groups actions resources and permissions.

Some manual configuration overrides that fall outside defaults.

1. This is going to be executed in the deno runtime, not Node

2. All source code is defined in the src/ directory.  There are a few different main directories

- api - the hono api that will serve as the main better auth instance

- cli - the cli application that will be used from developer's local machines to interact with a lot of the core systems. This will basically be an easier interface that will just make api calls in a more structured manner.

- database - the primary database configuration. This is using prisma.

- sdk - a distributable typescript package that will allow interfacing with the auth and rbac system in client applications. This will functionally wrap better-auth and provide access to our oauth configuration and the rbac system that is built on top of it.

- schemas - zod schema definitions that will be used on the client side (cli) and on the server side (api)

3. I am sourcing the better auth url and database url (prisma) so we can load it dynamically by defining different values in the env/api.local (or whatever env file we decide to use). This is a pattern repeated in several instances. The primary driver of this idea is to accidentally avoid leaking the DatabaseURL value and running queries against a production database instance.
