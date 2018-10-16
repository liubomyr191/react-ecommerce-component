import React, { Component } from "react";
import PropTypes from "prop-types";
import uniqueId from "lodash.uniqueid";
import { Form } from "reacto-form";
import styled from "styled-components";
import { withComponents } from "@reactioncommerce/components-context";
import { applyTheme, addTypographyStyles, CustomPropTypes } from "../../../utils";

// TODO: make grid utiil
// const Grid = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   justify-content: space-between;
//   padding: ${applyTheme("AddressReview.warningMessagePaddingLeft")};
// `;

// const ColHalf = styled.div`
//   flex: 1 1 100%;

//   @media (min-width: ${applyTheme("sm", "breakpoints")}px) {
//     flex: 0 1 calc(50% - 9px);
//   }
// `;

// component styles
const WarningMessage = styled.div`
  ${addTypographyStyles("WarningMessage", "labelText")};
  border-color: ${applyTheme("AddressReview.warningMessageBorderColor")};
  border-style: ${applyTheme("AddressReview.warningMessageBorderStyle")};
  border-width: ${applyTheme("AddressReview.warningMessageBorderWidth")};
  background-color: ${applyTheme("AddressReview.warningMessageBackgroundColor")};
  color: ${applyTheme("AddressReview.warningMessageColor")};
  padding-bottom: ${applyTheme("AddressReview.warningMessagePaddingBottom")};
  padding-left: ${applyTheme("AddressReview.warningMessagePaddingLeft")};
  padding-right: ${applyTheme("AddressReview.warningMessagePaddingRight")};
  padding-top: ${applyTheme("AddressReview.warningMessagePaddingTop")};
`;

const ENTERED = "entered";
const SUGGESTED = "suggested";

class AddressReview extends Component {
  static propTypes = {
    /**
     * Address entered
     */
    addressEntered: CustomPropTypes.address.isRequired,
    /**
     * Address validations address suggestion
     */
    addressSuggestion: CustomPropTypes.address.isRequired,
    /**
     * You can provide a `className` prop that will be applied to the outermost DOM element
     * rendered by this component. We do not recommend using this for styling purposes, but
     * it can be useful as a selector in some situations.
     */
    className: PropTypes.string,
    /**
     * If you've set up a components context using @reactioncommerce/components-context
     * (recommended), then this prop will come from there automatically. If you have not
     * set up a components context or you want to override one of the components in a
     * single spot, you can pass in the components prop directly.
     */
    components: PropTypes.shape({
      /**
       * Pass either the Reaction Address component or your own component that
       * accepts compatible props.
       */
      Address: CustomPropTypes.component.isRequired,
      /**
       * Pass either the Reaction Checkbox component or your own component that
       * accepts compatible props.
       */
      Checkbox: CustomPropTypes.component.isRequired,
      /**
       * Pass either the Reaction Field component or your own component that
       * accepts compatible props.
       */
      Field: CustomPropTypes.component.isRequired
    }).isRequired,
    /**
     * Is data being saved
     */
    isSaving: PropTypes.bool,
    /**
     * Form name
     */
    name: PropTypes.string,
    /**
     * Form submit event callback
     */
    onSubmit: PropTypes.func,
    /**
     * The selected address option
     */
    value: PropTypes.string
  };

  static defaultProps = {
    isSaving: false,
    value: SUGGESTED
  };

  _form = null;

  uniqueInstanceIdentifier = uniqueId("AddressReviewForm_");

  submit = () => this._form.submit();

  render() {
    const {
      addressEntered,
      addressSuggestion,
      className,
      components: { Address, SelectableList },
      isSaving,
      onSubmit,
      value
    } = this.props;

    const options = [
      {
        id: `${ENTERED}_${this.uniqueInstanceIdentifier}`,
        detail: <Address address={addressEntered} />,
        label: "Entered Address:",
        value: ENTERED
      },
      {
        id: `${SUGGESTED}_${this.uniqueInstanceIdentifier}`,
        detail: <Address address={addressSuggestion} />,
        label: "Suggested Address:",
        value: SUGGESTED
      }
    ];

    return (
      <div className={className}>
        <WarningMessage>Dat address be wrong!</WarningMessage>
        <Form
          ref={(formEl) => {
            this._form = formEl;
          }}
          onSubmit={onSubmit}
        >
          <SelectableList
            isBordered
            isLeftAligned
            options={options}
            name="AddressReview"
            value={value}
            isReadOnly={isSaving}
          />
        </Form>
      </div>
    );
  }
}

export default withComponents(AddressReview);
