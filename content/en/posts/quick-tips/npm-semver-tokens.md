---
title: Quick Tips - npm semver tokens
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

You may have noticed before, in `package.json` files, the dependency versions include a prefix that tell npm how to look for updates. These are kind of deeply embedded in the docs so I will list them here

Token | Definition
------|-----------
`^` | Look for Minor Releases (`0.y.0`)
`*` | Look for Major Releases (`x.0.0`)
`~` | Look for Patch Releases (`0.0.z`)
