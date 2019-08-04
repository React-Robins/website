import React from 'react'
import PropTypes from 'prop-types'
import StyledTextBlock from './TextBlock.style'

const TextBlock = ({ textBlockHTML }) => (
  <div className="text-block-container">
    <StyledTextBlock>
      <div
        className="text-block-content"
        dangerouslySetInnerHTML={{
          __html: textBlockHTML,
        }}
      />
    </StyledTextBlock>
  </div>
)

TextBlock.propTypes = {
  textBlockHTML: PropTypes.string.isRequired,
}

export default TextBlock
