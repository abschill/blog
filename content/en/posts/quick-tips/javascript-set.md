---
title: Quick Tips - Set in Javascript
date: 2022-07-27
enableToc: false
draft: false
enableTocContent: false
series:
- quick-tips
categories:
- quick-tips
- code-quality
---

When writing javascript, most of us default to using objects/arrays when we need to store stuff. It makes the most sense usually, but there are 2 other types that are often slept on. These types are `Map` and `Set`. Today we will be going over `Set`. If you missed the post on `Map`, [click here](/posts/quick-tips/javascript-map/)

## Set

Set objects are collections of values, similar to an array. A value in the `Set` may only occur once, unlike an array. The insertion order corresponds to the order in which each element was inserted into the set by the `add()` method successfully. It may be "unsuccessful" (a no-op) if the element already exists in the set, however.

The specification requires sets to be implemented "that, on average, provide access times that are sublinear on the number of elements in the collection". Therefore, it could be represented internally as a hash table (with `O(1)` lookup), a search tree (with `O(log(N))` lookup), or any other data structure, as long as the complexity is better than `O(N)`.

The Set `has` method checks if a value is in a Set object, using an approach that is, on average, quicker than testing most of the elements that have previously been added to the `Set` object. In particular, it is, on average, faster than the `Array.prototype.includes` method when an Array object has a length equal to a `Set` object's size.

## Basic Example

```javascript
const mySet1 = new Set()
mySet1.add(1)           // Set [ 1 ]
mySet1.add(5)           // Set [ 1, 5 ]
mySet1.add(5)           // Set [ 1, 5 ]
mySet1.add('some text') // Set [ 1, 5, 'some text' ]
const o = {a: 1, b: 2}
mySet1.add(o)
mySet1.add({a: 1, b: 2})   // o is referencing a different object, so this is okay
mySet1.has(3)              // false, since 3 has not been added to the set
mySet1.has(5)              // true
mySet1.has(Math.sqrt(25))  // true because that equals a value of 5
mySet1.has('Some Text'.toLowerCase()) // true
mySet1.has(o)       // true because the value of o is the same thing that was added so its the same object equality
mySet1.size         // 5
mySet1.delete(5)
mySet1.has(5)       // false
mySet1.size         // 4
console.log(mySet1)
// logs Set(4) [ 1, "some text", {…}, {…} ] in Firefox
// logs Set(4) { 1, "some text", {…}, {…} } in Chrome
```


## Some Extension Implementations

```javascript
function isSuperset(set, subset) {
	for (const elem of subset) {
		if (!set.has(elem)) {
			return false;
		}
	}
  	return true;
}

function union(setA, setB) {
	const _union = new Set(setA);
	for (const elem of setB) {
		_union.add(elem);
	}
  	return _union;
}

function intersection(setA, setB) {
	const _intersection = new Set();
	for (const elem of setB) {
		if (setA.has(elem)) {
			_intersection.add(elem);
		}
	}
	return _intersection;
}

function symmetricDifference(setA, setB) {
	const _difference = new Set(setA);
	for (const elem of setB) {
		if (_difference.has(elem)) {
			_difference.delete(elem);
		} else {
			_difference.add(elem);
		}
	}
	return _difference;
}

function difference(setA, setB) {
	const _difference = new Set(setA);
	for (const elem of setB) {
		_difference.delete(elem);
	}
	return _difference;
}

// Examples
const setA = new Set([1, 2, 3, 4])
const setB = new Set([2, 3])
const setC = new Set([3, 4, 5, 6])

isSuperset(setA, setB)          // returns true
union(setA, setC)               // returns Set {1, 2, 3, 4, 5, 6}
intersection(setA, setC)        // returns Set {3, 4}
symmetricDifference(setA, setC) // returns Set {1, 2, 5, 6}
difference(setA, setC)          // returns Set {1, 2}
```
