# UCAuth CLI

*Binaries are stored on the UCAuth github under releases*

`ucauth` is a command line tool that can be used to interact with the production Utah County authentication system, and provides several tools to aid in development of client / consumer applications.

## Quick Start

Getting a project initialized is straightforward.  First, download the binary for your platform from the ucg-auth github under the releases tab.

Next, change your working directory to your project root (or any of it's subdirs). The CLI will automatically walk up the file system tree until it finds a deno.json or a package.json.

## API

`ucauth` exposes the following commands. They will be overviewed below, then explained in more detail further on.

- login
- status
- generate
- init
- actions
- resources
- permissions
- groups
- roles
