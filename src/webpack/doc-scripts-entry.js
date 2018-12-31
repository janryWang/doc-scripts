module.exports = function(options) {
  return {
    code: `
var React = require('react')
var ReactDOM = require('react-dom')
var ReactDocRenderer = require('react-doc-renderer')
var docs = [
  ${options.docs
    .map(path => {
      return `(function(){
        var component = require("${path}");
        return {
          path:"${path}",
          component:component,
          meta:component.meta
        }
      })()`
    })
    .join(',')}
];

ReactDOM.render(
   React.createElement(ReactDocRenderer,{docs:docs}),
   document.getElementById('root')
);
`
  }
}
