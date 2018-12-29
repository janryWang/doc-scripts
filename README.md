<p align="center">
<img src="https://img.alicdn.com/tfs/TB1fk0Qy3HqK1RjSZFEXXcGMXXa-1616-626.png">
<a href="https://www.npmjs.com/package/doc-scripts"><img src="https://img.shields.io/npm/v/doc-scripts.svg"></a>
<a href="https://travis-ci.com/janryWang/doc-scripts"><img src="https://travis-ci.com/janryWang/doc-scripts.svg?branch=master"></a>
<a href="https://standardjs.com"><img src="https://img.shields.io/badge/code_style-standard-brightgreen.svg"></a>
</p>



## Features 🦑

- 🛠 No config
- 😆 Based on Markdown,Merge and Show all markdown files
- 👩‍💻 Code Highlighting And JSX Code is Runnable
- 💯Emoji Support
- ✨Creates Static files (only JS is prism)
- 🏳️‍🌈 Pretty Pages
- 🦄 Customizable
- 🇳🇱 [CodeSandbox](https://codesandbox.io/) and iframe Support



## Install 🦅

```bash
npm install --save doc-scripts
```



## Usage 🌈

**node cli**

```bash

doc-scripts start

doc-script build

```

**javascript api**

```javascript

import {execute} from 'doc-scripts'

execute('start') or execute('build')

```

**Webpack extended configuration**

Create a new file named doc-scripts.config.js in the root directory.
The following is the specific format specification.

```javascript

module.exports = {
  module:{
    rules:[]
  },
  plugins:[]
}

//or

module.exports = function(config){
  return {
    ...config,
    module:{
      rules:[]
    },
    plugins:[]
  }
}

```

**Demo HTML Template extended configuration**

Create a new file named doc-scripts.header.html or doc-scripts.footer.html in the root directory.
The following is the specific format specification.

```html
<!-- this is doc-scripts.header.html -->
<link rel="stylesheet" href="//unpkg.com/@alifd/next/dist/next.min.css"/>
```


## Contributors 💪🏻 

<!-- ALL-CONTRIBUTORS-LIST: START - Do not remove or modify this section -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

### LICENSE

Doc scripts is open source software licensed as [MIT.](./LICENSE)