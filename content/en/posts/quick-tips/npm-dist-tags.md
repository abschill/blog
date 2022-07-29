---
title: Quick Tips - npm dist tags
date: 2022-07-29
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

# Publishing dist tags on npm

Tags can be used to provide an alias instead of version numbers. For example, a project might choose to have multiple streams of development and use a different tag for each stream, e.g., `stable`, `beta`, `dev`, `canary`. Publishing a package sets the latest tag to the published version unless the `--tag` option is used. For example, `npm publish --tag=beta`. By default, `npm install <pkg>` (without any `@<version>` or `@<tag>` specifier) installs the latest tag. The `next` tag is used by some projects to identify the upcoming version.

Tags must share a namespace with version numbers, because they are specified in the same slot: `npm install <pkg>@<version>` vs `npm install <pkg>@<tag>`. Tags that can be interpreted as valid semver ranges will be rejected. For example, v1.4 cannot be used as a tag, because it is interpreted by semver as >=1.4.0 <1.5.0. The simplest way to avoid semver problems with tags is to use tags that do not begin with a number or the letter `v`

## Adding Tags

```
npm dist-tag add <package-spec (with version)> [<tag>]
```

- `add`: Tags the specified version of the package with the specified tag, or the `--tag` config if not specified. If you have two-factor authentication on auth-and-writes then you’ll need to include a one-time password on the command line with `--otp <one-time password>`, or at the OTP prompt
- `rm`: Clear a tag that is no longer in use from the package. If you have two-factor authentication on auth-and-writes then you’ll need to include a one-time password on the command line with `--otp <one-time password>`, or at the OTP prompt.
- `ls`: Show all of the dist-tags for a package, defaulting to the package in the current prefix. This is the default action if none is specified.

A tag can be used when installing packages as a reference to a version instead of using a specific version number:

```
npm install <name>@<tag>
```

When installing dependencies, a preferred tagged version may be specified. This also applies to any other commands that resolve and install dependencies, such as npm dedupe, npm update, and npm audit fix:

```
npm install --tag <tag>
```



