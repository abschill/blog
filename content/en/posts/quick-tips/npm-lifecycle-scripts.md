---
title: Quick Tips - npm lifecycle scripts
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

# NPM Lifecycle scripts


The "scripts" property of your package.json file supports a number of built-in scripts and their preset life cycle events as well as arbitrary scripts. These all can be executed by running npm run-script `<stage>` or npm run `<stage>` for short. Pre and post commands with matching names will be run for those as well (e.g. `premyscript`, `myscript`, `postmyscript`).

To create "pre" or "post" scripts for any scripts defined in the "scripts" section of the package.json, simply create another script with a matching name and add "pre" or "post" to the beginning of them.

```json
{
  "scripts": {
    "precompress": "{{ executes BEFORE the `compress` script }}",
    "compress": "{{ run command to compress files }}",
    "postcompress": "{{ executes AFTER `compress` script }}"
  }
}
```

In this example `npm run compress` would execute these scripts as described.


## Life Cycle Scripts
There are some special life cycle scripts that happen only in certain situations. These scripts happen in addition to the `pre<event>`, `post<event>`, and `<event>` scripts.

- `prepare`
	- Runs any time before the package is packed, i.e. during `npm publish` and `npm pack`

	- Runs BEFORE the package is packed

	- Runs BEFORE the package is published

	- Runs on local npm install without any arguments

	- Run AFTER prepublish, but BEFORE prepublishOnly

NOTE: If a package being installed through git contains a prepare script, its dependencies and devDependencies will be installed, and the prepare script will be run, before the package is packaged and installed. As of npm v7 these scripts run in the background. To see the output, run with: `--foreground-scripts`.

- `prepublishOnly`
	- Runs BEFORE the package is prepared and packed, ONLY on `npm publish`
- `prepack`
	- Runs BEFORE a tarball is packed (on `npm pack`, `npm publish`, and when installing a git dependencies). NOTE: `npm run pack` is NOT the same as `npm pack`. `npm run pack` is an arbitrary user defined script name, where as, `npm pack` is a CLI defined command.
- `postpack`
	- Runs AFTER the tarball has been generated but before it is moved to its final destination (if at all, publish does not save the tarball locally)
- `dependencies`
	- Runs AFTER any operations that modify the node_modules directory IF changes occurred. Does NOT run in global mode

## The Order of Lifecycle Scripts per commands

- `npm cache add`
	- `prepare`
- `npm ci`
	- `preinstall`
	- `install`
	- `postinstall`
	- `prepublish`
	- `preprepare`
	- `prepare`
	- `postprepare`
These all run after the actual installation of modules into node_modules, in order, with no internal actions happening in between
- `npm diff`
	- `prepare`
- `npm install`
	- `preinstall`
	- `install`
	- `postinstall`
	- `prepublish`
	- `preprepare`
	- `prepare`
	- `postprepare`

If there is a binding.gyp file in the root of your package and you haven't defined your own install or preinstall scripts, npm will default the install command to compile using node-gyp via `node-gyp rebuild`

- `npm pack`
	- `prepack`
	- `prepare`
	- `postpack`
- `npm publish`
	- `prepublishOnly`
	- `prepack`
	- `prepare`
	- `postpack`
	- `publish`
	- `postpublish`
`prepare` will not run during `--dry-run`
- `npm rebuild`
	- `preinstall`
	- `install`
	- `postinstall`
	- `prepare`
- `npm restart`
If there is a restart script defined, these events are run, otherwise stop and start are both run if present, including their pre and post iterations)
	- `prerestart`
	- `restart`
	- `postrestart`
- `npm run <user_defined>`
	- `pre<user_defined>`
	- `<user_defined>`
	- `post<user_defined>`
It just keeps going like this, im gonna stop now
