# Video Poker Academy

[![Made with Fresh](https://fresh.deno.dev/fresh-badge.svg)](https://fresh.deno.dev)

This is an example project, it's released under the MIT license. Please feel
free to take look around.

The "Simple Strategy" content on the homepage is from https://wizardofodds.com/

https://wizardofodds.com/games/video-poker/strategy/jacks-or-better/9-6/simple/

### Setup

Create an `.env` file, then fill out your secrets.

```
cp .env.example .env
```

You will need a redis server to run this software.

### Usage

Start the project:

```
deno task start
```

This will watch the project directory and restart as necessary.

### Secrets for GitHub Actions

Use this command to get the secret contents

```
base64 -i .env.github | pbcopy
```

secret name should be `ENV_GITHUB_ACTIONS`

### Now Compatible with Deno Deploy (with KV Store)

The project has been updated to use KV store in place of Redis. You can check
that version of the site out here: https://video-poker-academy.deno.dev/
