---
title: Quick Tips - npm workspaces
date: 2022-07-12
enableToc: false
draft: false
enableTocContent: false
series:
- quick-tips
categories:
- quick-tips
- node
- npm
image: images/npm.png
---

Many of you might be in a similar position to where I was, thinking lerna still served some sort of useful purpose in the node ecosystem, but no, it doesnt apparently.

Since npm v7, there has been a `workspaces` option supported in package.json, and it allows you to run arbitrary npm commands in these workspaces the same way these external dependencies used to do. Workspaces allow you to auto symlink and set up local dependencies with their own versions for packages. You don't have to run `npm link` once, who would have guessed. You can define workspaces like so:

```json
{
  "name": "my-workspaces-powered-project",
  "workspaces": [
    "packages/a"
  ]
}
```

This will symlink package `a` at that directory, and install it in `node_modules` when you install the package.json itself. If your project already has a package.json you can run `npm init -w ./packages/a` to create these lines automatically. It can also create a new project with the package workspace automatically set up, if no such package.json exists.

run unit tests in package `a`:

```bash
npm run test --workspace=a
```

run unit tests in all workspace packages:

```bash
npm run test --workspaces
```

conditional:

```bash
npm run test --workspaces --if-present
```

The moral of the story is stop using lerna. stop using lerna
