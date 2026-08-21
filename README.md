# 2d-jump-and-run-demo
Very basic demo of a 2D jump and run with HTML + Typescript


# Setup development environment

After cloning of the repr, run `npm ci` to install the node modules in the correct version. If that fails for any reason, run `npm install` instead.

Afterwards, run `nmp run` to see the available

# Initial setup

- Download / install node.js and npm
- Create this folder
- Run `npm init -y`
- Install typescript and lite-server locally: `npm install typescript lite-server --save-dev`
- Init configuration: `npx tsc --init`


## Setup typescript

tsconfig.json:
```json
    "rootDir": "./src"/ts,
    "outDir": "./dist/js",
    "module": "ES2020",
    "target": "ES6", // or ES2020
```

package.json:
```json
  change "type": "commonjs" to "type": "module"
```

## Manual build and run

`npx tsc` compiles it
But html / css files needs to be copied to dist folder manually

Run:
`node dist\js\main.js`


## Node scripts for easier handing

In package.json:
```json
  "scripts": {
    "build": "tsc",
    "watch": "tsc --watch",
    "start": "lite-server"
  },
````

### lite-server

Tell lite-server the base folder is .\dist folder: Create bs-config.json with content

```json
{
  "server": {
    "baseDir": "./dist"
  }
}
```

### Improvement

`npm install --save-dev npm-run-all`

in package.json "scripts" section:
```json
add "dev": "run-p watch serve"
````

Run:
`npm run dev`


# Development

Open two terminal windows:

`npm run build`

`npm run start-server`

## better

`npm install --save-dev npm-run-all`

`npm run dev`


# Debug

Add .vscode/launch with


{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug Lite Server",
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:3000",
      "webRoot": "${workspaceFolder}",
    }
  ]
}


