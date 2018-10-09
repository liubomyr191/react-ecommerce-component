import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import uniqueId from "lodash.uniqueid";
import { withComponents } from "@reactioncommerce/components-context";
import { addTypographyStyles, applyTheme } from "../../../utils";

const StyledLabel = styled.label`
  ${addTypographyStyles("SelectableItemLabel", "labelText")}
  align-items: center;
  cursor: pointer;
  display: flex;
`;

const StyledRadioButton = styled.span`
  align-items: center;
  background-color: ${applyTheme("SelectableItemRadioButton.backgroundColor")};
  border-radius: 50%;
  border-color: ${applyTheme("SelectableItemRadioButton.borderColor")};
  border-style: solid;
  border-width: ${applyTheme("SelectableItemRadioButton.borderWidth")};
  box-sizing: border-box;
  display: flex;
  flex-shrink: 0;
  height: ${applyTheme("SelectableItemRadioButton.size")};
  justify-content: center;
  margin-bottom: 0;
  margin-left: 0;
  margin-right: ${applyTheme("SelectableItemRadioButton.spacingToLabel")};
  margin-top: 0;
  width: ${applyTheme("SelectableItemRadioButton.size")};
`;

const StyledInput = styled.input`
  border: 0;
  clip: rect(0, 0, 0, 0);
  cursor: pointer;
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  visibility: visible;
  white-space: nowrap;
  width: 1px;
  &:checked + ${StyledLabel} ${StyledRadioButton}::before {
    content: " ";
    display: inline-block;
    position: relative;
    width: ${applyTheme("SelectableItemRadioButton.checkSize")};
    height: ${applyTheme("SelectableItemRadioButton.checkSize")};
    border-radius: 50%;
    background-color: ${applyTheme("SelectableItemRadioButton.color")};
  }
  &:focus + ${StyledLabel} ${StyledRadioButton} {
    box-shadow: ${applyTheme("SelectableItemRadioButton.focus")};
    outline: ${applyTheme("SelectableItemRadioButton.focusOutline")}
  }
  &:disabled + ${StyledLabel} ${StyledRadioButton} {
    background-color: ${applyTheme("SelectableItemRadioButton.disabledFillColor")};
  }
  &:disabled + ${StyledLabel} {
    opacity: ${applyTheme("SelectableItemRadioButton.disabledOpacity")};
  }
  &:disabled + ${StyledLabel}:hover {
    cursor:  ${applyTheme("SelectableItemRadioButton.disabledCursor")};
  }
`;

const StyledDetail = styled.div`
  ${addTypographyStyles("SelectableItemDetail", "bodyText")}
  align-items: center;
  display: flex;
  justify-content: center;
`;

const StyledIcon = styled.span`
  border-radius: ${applyTheme("SelectableList.borderRadius")};
  border-color: ${applyTheme("SelectableList.borderColor")};
  border-style: ${applyTheme("SelectableList.borderStyle")};
  border-width: ${applyTheme("SelectableList.borderWidth")};
  height: ${applyTheme("SelectableList.iconHeight")};
  margin-bottom: 0;
  margin-left: 0;
  margin-right: ${applyTheme("SelectableList.iconSpacingToLabel")};
  margin-top: 0;
  width: ${applyTheme("SelectableList.iconWidth")};
  svg {
    height: ${applyTheme("SelectableList.iconHeight")};
    width: ${applyTheme("SelectableList.iconWidth")};
  }
`;

const StyledItem = styled.div`
  display: flex;
  justify-content: space-between;
  height: ${applyTheme("SelectableList.height")};
  @media (max-width: 768px) {
    height: ${applyTheme("SelectableList.heightMobile")};
  }
`;

const LeftAlignedItem = styled.div`
  display: flex;
  justify-content: flex-start;
  height: ${applyTheme("SelectableList.height")};
  @media (max-width: 768px) {
    height: ${applyTheme("SelectableList.heightMobile")};
  }
  ${StyledLabel} {
    position: relative;
    font-weight: ${applyTheme("SelectableList.leftAlignedLabelFontWeight")};
  }
  ${StyledDetail} {
    ${addTypographyStyles("SelectableItemDetailLeft", "labelText")}
    margin-left: ${applyTheme("SelectableList.leftAlignedDetailSpacingToLabel")};
  }
`;

class SelectableItem extends Component {
  static propTypes = {
    /**
     * Optional text, SVG or element displayed on the right-hand side
     */
    detail: PropTypes.node,
    /**
     * Optional icon (SVG) displayed on the left-hand side
     */
    icon: PropTypes.node,
    /**
     * `true` if the item is checked
     */
    isChecked: PropTypes.bool,
    /**
     * Left-aligned style
     */
    isLeftAligned: PropTypes.bool,
    /**
     * Read only and disabled state
     */
    isReadOnly: PropTypes.bool,
    /**
     * Label
     */
    label: PropTypes.string.isRequired,
    /**
     * Called whenever this item becomes selected or unselected. Two arguments are provided,
     * `isChecked` and the `value` prop that was passed in.
     */
    onChange: PropTypes.func,
    /**
     * A value to be passed to `onChange`
     */
    value: PropTypes.string.isRequired
  }

  static defaultProps = {
    onChange() { },
    isChecked: false,
    isLeftAligned: false,
    isReadOnly: false
  };

  uniqueInstanceIdentifier = uniqueId("SelectableItem_");

  handleChange = (event) => {
    const { value } = this.props;
    this.props.onChange(event.target.checked, value);
  };

  render() {
    const {
      detail,
      icon,
      isChecked,
      isLeftAligned,
      isReadOnly,
      label,
      value
    } = this.props;

    const id = `radio_${this.uniqueInstanceIdentifier}`;

    const input = (
      <StyledInput
        id={id}
        checked={isChecked}
        value={value}
        onChange={this.handleChange}
        type="radio"
        disabled={isReadOnly}
      />
    );

    const labelAndButton = (
      <StyledLabel
        htmlFor={id}
      >
        <StyledRadioButton />
        {icon ? <StyledIcon>{icon}</StyledIcon> : null}
        {label}
      </StyledLabel>
    );

    return (
      <div>
        {isLeftAligned ?
          <LeftAlignedItem>
            {input}
            {labelAndButton}
            {detail ? <StyledDetail>{detail}</StyledDetail> : null}
          </LeftAlignedItem >
          :
          <StyledItem>
            {input}
            {labelAndButton}
            {detail ? <StyledDetail>{detail}</StyledDetail> : null}
          </StyledItem >
        }
      </div>
    );
  }
}

export default withComponents(SelectableItem);
