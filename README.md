# Doc Scripts

> React Document Scripts
>
> - 🛠 No config
> - 👩‍💻 Code Highlighting And JSX Code is Runnable
> - 💯Emoji Support
> - ✨Creates Static files (only JS is prism)
> - 🏳️‍🌈 Pretty Pages
> - 🦄 Customizable
> - 🇳🇱 [CodeSandbox](https://codesandbox.io/) and iframe Support

## Install

```bash
npm install --save doc-scripts
```

## Usage

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


### LICENSE

The MIT License (MIT)

Copyright (c) 2018 JanryWang

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
