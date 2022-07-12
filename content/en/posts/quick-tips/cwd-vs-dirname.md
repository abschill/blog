---
title: Quick Tips - cwd vs dirname in node
date: 2022-06-21
enableToc: false
draft: false
enableTocContent: false
series:
- quick-tips
categories:
- quick-tips
---

These 2 are commonly used to mean pretty different things in node.

`process.cwd()` is a function that is evaluated to the working directory of the process, by default this is the directory where the process was called from (where "node index.js" was called), but can be updated during the program's lifecycle with `process.chdir`. `__dirname` on the other hand is used to refer to the path of the module the code calling `__dirname` itself, is located on the system scope of `process`. So basically, use `process.cwd()` to get the directory that the process started, and `__dirname` to get the directory the module you're writing in.

imagine the following directory structure

```
<base>/
index.js
src/module0.js
```

src/module0.js
```javascript
console.log(process.cwd())
console.log(__dirname);
```

index.js
```javascript
require('./src/module0')
```
this will print `<base>` and then `<base>/src` as absolute paths, because module0 exists inside of `/src` it will be returned as the `__dirname`
