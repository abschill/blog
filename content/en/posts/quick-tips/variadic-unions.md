---
title: Quick Tips - variadic unions in typescript
date: 2022-07-14
enableToc: false
draft: false
enableTocContent: false
series:
- quick-tips
categories:
- quick-tips
- typescript
image: images/typescript.png
---

A lot of the time, you want to define union types in typescript, and you would set it up like this by default for a small collection of enumerated values-as-types:

```typescript
type Foobar = "foo" | "bar" | "baz";
```

A better way to scale this with more value options, is to use an array index as a type, and have that array contain your options:


```typescript
const FoobarOptions = [
	"foo",
	"bar",
	"baz"
] as const;
type Foobar = typeof FoobarOptions[number];
```

This would do the same thing but it is way less annoying to deal with when you end up with a lot of options.
