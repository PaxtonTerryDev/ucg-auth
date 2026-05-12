# UCG Auth SDK

The SDK wraps the better-auth client package and provides a seamless integration with the UCG Auth system.



## The Session and User objects

Similar to Next Auth, you can use `better-auth` to query for session data.  `ucg-auth-sdk` wraps and re-exports these values.

The session carries the same data as most other auth providers. The user object is more interesting - 

On sign-in, the system automatically queries and gets the user's role assignments. These roles are then directly injected into the user object, and can be used to determine what can and cannot be viewed / performed by the user.
