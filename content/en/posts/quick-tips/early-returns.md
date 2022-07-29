---
title: Quick Tips - Early Returns
date: 2022-06-20
enableToc: false
draft: false
enableTocContent: false
series:
- quick-tips
categories:
- quick-tips
- code-quality
image: images/programming.jpeg
---

A good tip to keep in mind when programming is minimizing your use of `else` statements. When possible, exit the function context earlier given a value that establishes the given return, rather than reflecting that with an else statement to check for something else. That may sound complicated, but its not, here is an example:

Do This
```javascript
function thing(args) {
	if(!args.required_thing) {
		throw 'missing required thing';
	}
	// do something + return, or return
}
```

Not This

```javascript
function thing(args) {
	if(args.required_thing) {
		// do something + return, or return

	} else {
		throw 'missing required thing';
	}
}
```

Figure 1 uses the end of the function to assume a positive result, exiting if this is not met as early as possible. This is pretty much always going to be preferred to Figure 2.
