# Module federation tooling mixing experiment

This repository contains some experimental code to verify compatibility between Rspack, Webpack, and Vite module federation build outputs. The interest is mainly in dynamic remotes which are resolved at runtime.


## Dynamic remotes support

|Tool|Out of the box support|Possible to implement custom support|
|---|---|---|
|Rspack|:white_check_mark:|:white_check_mark:|
|Webpack|:white_check_mark:|:white_check_mark:|
|@module-federation/enhanced|:white_check_mark:|:white_check_mark:|
|@originjs/vite-plugin-federation|:x:|:white_check_mark:|
|@module-federation/vite|:question:|:question:|

At the time of writing, it is possible to create a host application that accepts remote modules build by all mentioned tools. Vite has a limited support and requires some custom code to be implemented. For vite, There are multiple plugins to be chosen from.
## Runtime compatibility

- :white_check_mark: Out of the box compatibility
- :warning: Requires custom implementation 
- :x: Not compatible

|x|Rspack|Webpack|@module-federation/enhanced|@originjs/vite-plugin-federation|
|---|---|---|---|---|
|Rspack|x|:white_check_mark:|:white_check_mark:|:warning:|
|Webpack|:white_check_mark:|x|:white_check_mark:|:warning:|
|@module-federation/enhanced|:white_check_mark:|:white_check_mark:|x|:warning:|
|@originjs/vite-plugin-federation|:warning:|:warning:|:warning:|x|

None of Vite builds are compatible with `@module-federation/runtime` package out of the box. Extra bridge is required. Rspack and Webpack (both the core and the `@module-federation/enhanced` packages) are compatible out of the box.

## Demos

### Installing

Run

```
npm install
```

There are several ways of running demos:

### Consuming all different types of build from a single remote

In the project root, run the `npm run dev`. This command will serve Rspack shell app, with all different remote modules output versions.

### Running different shell applications.

There are 4 different shell applications. They are located in these packages:

- `./rspack`
- `./webpack`
- `./webpack-native`
- `./vite`

Each of these shell apps are trying to consume remote modules from all other shell applications.

Each package with has the `npm run dev` script that starts development environment and the shell app.

>NOTE: Vite does not output the remote container with dev server. In order to provide the remote module for other shells to consume, run the `npm run serve` script in the `./vite` package.
