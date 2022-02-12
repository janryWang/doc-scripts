# Doc Scripts Examples

> This is readme

### Cli Usage

```bash
npm run start:doc

npm run build:doc
```

### Code Highlights

> support js/html/css/bash

#### JSX Code Runnable

```jsx

export default ()=>{
  return <div>
    This is JSX code, and it is runnable
  </div>
}

```
#### React Component Props Table

<!-- BLOCK_START : COMPONENT_PROPS : ./src/Button.js -->
<table class=" PropsTable"><thead><tr><th class="PropsTable--property">Property</th><th class="PropsTable--type">Type</th><th class="PropsTable--required">Required</th><th class="PropsTable--default">Default</th><th width="40%" class="PropsTable--description">Description</th></tr></thead><tbody><tr><td>label</td><td>String</td><td>false</td><td><em>-</em></td><td>Label for the button.</td></tr><tr><td>onClick</td><td>Func</td><td>false</td><td><em>-</em></td><td>Triggered when clicked on the button.</td></tr></tbody></table>
<!-- BLOCK_END -->

#### Javascript Code Highlights

```javascript

export default () => {
  return 'This is Javascript code'
}

```

### HTML Code Highlights

```html

<div>
  <div>This is HTML Code</div>
</div>

```

### CSS Code Highlights

```css

.sss{
   background:#3333;
}

```

### Bash Code Highlights

```bash

npm run start:doc

```