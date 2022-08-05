---
title: Quick Tips - javascript proxies
date: 2022-08-05
enableToc: false
draft: false
enableTocContent: false
series:
- quick-tips
categories:
- quick-tips
- javascript
image: images/javascript.png
---

# The `Proxy` object in javascript

Allows you to create a wrapper for another object, which can intercept and redefine fundamental operations for that object. The `Proxy`  allows you to create an object that can be used in place of the original object, which is where it gets the name "proxy", and it may redefine fundamental `Object` operations like getting, setting, and defining properties. Proxy objects are commonly used to log property accesses, validate, format, or sanitize inputs, and so on.

## Proxy Arguments

Arg | Desc
----|----
`target` | the original object which you want to proxy
`handler` | an object that defines which operations will be intercepted and how to redefine intercepted operations.

### Blank Example

```js
const target = {
  message1: "hello",
  message2: "everyone"
};

const handler1 = {};

const proxy1 = new Proxy(target, handler1);

console.log(proxy1.message1); // hello
console.log(proxy1.message2); // everyone
```

Works same as normal bc the handler is empty.

```js
const target = {
  message1: "hello",
  message2: "everyone"
};

const handler2 = {
  get(target, prop, receiver) {
    return "world";
  }
};

const proxy2 = new Proxy(target, handler2);
console.log(proxy2.message1); // world
console.log(proxy2.message2); // world
```

Always returns world

```js
const target = {
  message1: "hello",
  message2: "everyone"
};

const handler3 = {
  get(target, prop, receiver) {
    if (prop === "message2") {
      return "world";
    }
    return Reflect.get(...arguments);
  },
};

const proxy3 = new Proxy(target, handler3);

console.log(proxy3.message1); // hello
console.log(proxy3.message2); // world
```
We can also use the `Reflect` class to use accessors from the original but add a condition that derives from that default.

### No-Op Reflection

```js
const target = {};
const p = new Proxy(target, {});

p.a = 37;
//  operation forwarded to the target

console.log(target.a);
```

We can set up like this as well as a reactive handler for a parent object. Note that doing this does not give the proxy access to private properties, such as [slots](https://tc39.es/ecma262/#sec-object-internal-methods-and-internal-slots)
