---
title: Quick Tips - publishing npm packages
date: 2022-07-28
enableToc: false
draft: false
enableTocContent: false
series:
- quick-tips
categories:
- quick-tips
- node
- npm
---

# Publishing an NPM package

## Things to remember

In `package.json`, make sure you define the following fields before publishing

- `main`
The entry point for your package, usually the build directory entry point, or the top level index js which points to that build entry.

- `types`
The same thing as main but for a `.d.ts` file that is the entry to the type defs.

- `files`
Array of glob patterns to match as to which files should be included in package. Usually build dir glob ie `build/**/*`

- `version`
semver that you are publishing to in the registry

- `exports`
map of export paths relative to the installation name of your package. if you do not set this, but you set the `main` key to `index.js`, then it would look like this:

```json
"exports": {
	".": "index.js"
}
```

You can set this up using this format to be tailored to your needs. You can also write that exact example like this:

```
exports: 'index.js'
```

You can also use conditional export patterns to determine if the user is `import`ing or `require`ing your package:

```json
{
  "exports": {
    "import": "./index-module.js",
    "require": "./index-require.cjs"
  },
  "type": "module"
}
```
Node.js implements the following conditions, listed in order from most specific to least specific as conditions should be defined:

- `node-addons` - similar to "node" and matches for any Node.js environment. This condition can be used to provide an entry point which uses native C++ addons as opposed to an entry point which is more universal and doesn't rely on native addons. This condition can be disabled via the `--no-addons` flag.
- `node` - matches for any Node.js environment. Can be a CommonJS or ES module file. In most cases explicitly calling out the Node.js platform is not necessary.
- `import` - matches when the package is loaded via import or `import()`, or via any top-level import or resolve operation by the ECMAScript module loader. Applies regardless of the module format of the target file. Always mutually exclusive with "require".
"require" - matches when the package is loaded via require(). The referenced file should be loadable with require() although the condition matches regardless of the module format of the target file. Expected formats include CommonJS, JSON, and native addons but not ES modules as require() doesn't support them. Always mutually exclusive with `import`.
- "default" - the generic fallback that always matches. Can be a CommonJS or ES module file. This condition should always come last.

Within the `exports` object, key order is significant. During condition matching, earlier entries have higher priority and take precedence over later entries. The general rule is that conditions should be from most specific to least specific in object order.

Using `import` and `require` can be awkward as described [here](https://nodejs.org/api/packages.html#dual-commonjses-module-packages).

The "node-addons" condition can be used to provide an entry point which uses native C++ addons. However, this condition can be disabled via the --no-addons flag. When using "node-addons", it's recommended to treat "default" as an enhancement that provides a more universal entry point, e.g. using WebAssembly instead of a native addon.

Conditional exports can also be extended to exports subpaths. You can also nest conditions for entry points like this:

```json
{
  "exports": {
    "node": {
      "import": "./feature-node.mjs",
      "require": "./feature-node.cjs"
    },
    "default": "./feature.mjs"
  }
}
```

Condition strings other than the `import`, `require`, `node`, `node-addons` and `default` conditions implemented in Node.js core are ignored by default. Other platforms may implement other conditions and user conditions can be enabled in Node.js via the `--conditions` flag.

Since custom package conditions require clear definitions to ensure correct usage, a list of common known package conditions and their strict definitions is provided below to assist with ecosystem coordination.

`types` - can be used by typing systems to resolve the typing file for the given export. This condition should always be included first.
`deno` - indicates a variation for the Deno platform.
`browser` - any web browser environment.
`development` - can be used to define a development-only environment entry point, for example to provide additional debugging context such as better error messages when running in a development mode. Must always be mutually exclusive with `production`.
`production` - can be used to define a production environment entry point. Must always be mutually exclusive with "development".

