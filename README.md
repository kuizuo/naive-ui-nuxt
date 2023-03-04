<p align="center">
  <img width="300px" src="https://camo.githubusercontent.com/b8ebecade711b9ae1fa306e7a1c9dd680fb56b0e2b9f015fec9cbad343570353/68747470733a2f2f6e6169766575692e6f73732d636e2d686f6e676b6f6e672e616c6979756e63732e636f6d2f6e616976656c6f676f2e737667">
</p>


# Naive UI Module

> [Naive UI](https://www.naiveui.com/) module for [Nuxt](https://nuxt.com)

## Features


- Automatically import components and styles on demand.
- Automatically import of useMessage, useNotification and other methods.

## Quick Setup

1. Add `naive-ui-nuxt` dependency to your project

```bash
# Using pnpm
pnpm add -D naive-ui-nuxt

# Using yarn
yarn add --dev naive-ui-nuxt

# Using npm
npm install --save-dev naive-ui-nuxt
```

2. Add `naive-ui-nuxt` to the `modules` section of `nuxt.config.ts`

```js
export default defineNuxtConfig({
  modules: [
    'naive-ui-nuxt'
  ]
})
```

## Development

```bash
# Install dependencies
npm install

# Generate type stubs
npm run dev:prepare

# Develop with the playground
npm run dev

# Build the playground
npm run dev:build
```
