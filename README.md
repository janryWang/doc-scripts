<p align="center">
<img src="https://img.alicdn.com/tfs/TB1fk0Qy3HqK1RjSZFEXXcGMXXa-1616-626.png">
<a href="https://www.npmjs.com/package/doc-scripts"><img src="https://img.shields.io/npm/v/doc-scripts.svg"></a>
<a href="https://travis-ci.com/janryWang/doc-scripts"><img src="https://travis-ci.com/janryWang/doc-scripts.svg?branch=master"></a>
<a href="https://standardjs.com"><img src="https://img.shields.io/badge/code_style-standard-brightgreen.svg"></a>
<img  src="https://img.alicdn.com/tfs/TB1N2p6y4jaK1RjSZFAXXbdLFXa-4044-3097.png">
</p>

## Features 🦑

- 🛠 No config
- 😆 Based on Markdown,Merge and Show all markdown files
- 👩‍💻 Code Highlighting And JSX Code is Runnable
- 💯 Emoji Support
- 🍖 React Props Table Support
- ✨ Creates Static files (only JS is prism)
- 🏳️‍🌈 Pretty Pages
- 🦄 Customizable
- 🇳🇱 [CodeSandbox](https://codesandbox.io/) and iframe Support

## Install 🦅

```bash
npm install --save doc-scripts
```

## Usage 🌈

**1. Node cli**

```bash

doc-scripts start

doc-script build

```

**2. Markdown Usage**

[examples](./examples/README.md)

**3. Javascript api**

```javascript

import {execute} from 'doc-scripts'

const options = {
  title:'xxxx',
  header:'<link rel="stylesheet" href="//xxxxxx">',
  footer:'<script>xxxxx</script>',
  renderer:'./doc-renderer.js',
  requires:[]
}

const webpackConfig = {
  module:{
    rules:[...]
  }
}

execute('start',options,webpackConfig) or execute('build',options,webpackConfig)

```

**4. Webpack extended configuration**

Create a new file named doc-scripts.config.js in the root directory. The
following is the specific format specification.

```javascript
module.exports = {
  module: {
    rules: []
  },
  plugins: []
}

//or

module.exports = function(config) {
  return {
    ...config,
    module: {
      rules: []
    },
    plugins: []
  }
}
```

**5. Demo HTML Template extended configuration**

Create a new file named doc-scripts.header.html or doc-scripts.footer.html in
the root directory. The following is the specific format specification.

```html
<!-- this is doc-scripts.header.html -->
<link rel="stylesheet" href="//unpkg.com/@alifd/next/dist/next.min.css" />
```

**6. Customize Doc Renderer**

Create a new file named doc-scripts.renderer.js  in
the root directory. The following is the specific format specification.

```jsx

import DocRenderer from 'react-doc-renderer'

//react-doc-renderer default render engien in doc-scripts, so ,you can continue to reuse this component in doc-scripts.renderer.js, or you can completely override its behavior.

export default ({docs = []})=>(
  <div>
    <DocRenderer docs={docs}/>
  </div>
)

```


## Contributors 💪🏻

<!-- ALL-CONTRIBUTORS-LIST:START  -->
<!-- prettier-ignore -->
| [<img src="https://avatars0.githubusercontent.com/u/4060976?v=4" width="100px;" alt="Janry"/><br /><sub><b>Janry</b></sub>](https://github.com/janryWang)<br />[📖](https://github.com/janrywang/doc-scripts/commits?author=janryWang "Documentation") [💻](https://github.com/janrywang/doc-scripts/commits?author=janryWang "Code") [👀](#review-janryWang "Reviewed Pull Requests") [🤔](#ideas-janryWang "Ideas, Planning, & Feedback") |
| :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

### LICENSE

Doc scripts is open source software licensed as [MIT.](./LICENSE)
