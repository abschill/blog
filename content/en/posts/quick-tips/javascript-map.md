---
title: Quick Tips - Map in Javascript
date: 2022-07-25
enableToc: false
draft: false
enableTocContent: false
series:
- quick-tips
categories:
- quick-tips
- code-quality
image: images/javascript.png
---

When writing javascript, most of us default to using objects/arrays when we need to store stuff. It makes the most sense usually, but there are 2 other types that are often slept on. These types are `Map` and `Set`. Today we will be going over `Map` and next we will go over `Set`.

# Map

A map is a collection of keyed data items, but unlike an object it can store the keys/values as any type, like number / boolean etc and not only strings. We can even use an object as a key, like so:


```javascript
let john = { name: "John" };

// for every user, let's store their visits count
let visitsCountMap = new Map();

// john is the key for the map
visitsCountMap.set(john, 123);

alert(visitsCountMap.get(john)); // 123
```

## Nested Key Retrieval
```javascript
// array of [key, value] pairs
let map = new Map([
  ['1',  'str1'],
  [1,    'num1'],
  [true, 'bool1']
]);

alert(map.get('1')); // str1
```

## Convert back to "object map"

```javascript
let prices = Object.fromEntries([
  ['banana', 1],
  ['orange', 2],
  ['meat', 4]
]);

// now prices = { banana: 1, orange: 2, meat: 4 }

alert(prices.orange); // 2
```
