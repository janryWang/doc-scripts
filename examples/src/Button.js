import React from 'react'
import PropTypes from 'prop-types'

const Button = ()=>{
  return <button>This is Button</button>
}

Button.propTypes = {
  /**
    Label for the button.
  */
  label: PropTypes.string,

  /**
    Triggered when clicked on the button.
  */
  onClick: PropTypes.func,
};

export default Button