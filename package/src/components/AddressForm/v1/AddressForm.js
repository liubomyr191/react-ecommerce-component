import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Form } from "reacto-form";
import styled from "styled-components";
import { applyTheme, getRequiredValidator } from "../../../utils";

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const ColFull = styled.div`
  flex: 1 1 100%;
`;

const ColHalf = styled.div`
  flex: 1 1 100%;

  @media (${applyTheme("bp_sm")}) {
    flex: 0 1 calc(50% - 9px);
  }
`;

const Actions = styled.div`
  display: block;
  margin: ${applyTheme("fieldMargin")};
  width: 100%;

  @media (${applyTheme("bp_sm")}) {
    display: flex;
    justify-content: flex-end;
  }
`;

const ActionsSpacer = styled.div`
  height: 10px;
  width: 10px;
`;

class AddressForm extends Component {
  static propTypes = {
    /**
     * Address object to be edited
     */
    address: PropTypes.shape({
      address1: PropTypes.string,
      address2: PropTypes.string,
      country: PropTypes.string,
      city: PropTypes.string,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      postal: PropTypes.string,
      region: PropTypes.string,
      phone: PropTypes.string
    }),
    /**
     * Provided child components for form inputs
     */
    components: PropTypes.shape({
      /**
       * Button component
       */
      ButtonComponent: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
      /**
       * ErrorsBlock component
       */
      ErrorsBlockComponent: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
      /**
       * Field component
       */
      FieldComponent: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
      /**
       * TextInput component
       */
      TextInputComponent: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
      /**
       * SelectInput component
       */
      SelectInputComponent: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
      /**
       * PhoneInput component
       */
      PhoneInputComponent: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
    }),
    /**
     * Country options
     */
    countries: PropTypes.arrayOf(PropTypes.shape({
      /**
         * Country option label ("United States", "Nigeria")
         */
      label: PropTypes.string,
      /**
         * Country option value ("US", "NU")
         */
      value: PropTypes.string
    })),
    /**
     * Can the form entry be canceled, when form is being used to edit an address
     */
    isCancellable: PropTypes.bool,
    /**
     * Cancel event callback
     */
    onCancel: PropTypes.func,
    /**
     * Country change event callback, used to fetch new list of regions if country has changed.
     */
    onCountryChange: PropTypes.func,
    /**
     * Form submit event callback
     */
    onSubmit: PropTypes.func,
    /**
     * Region options
     */
    regions: PropTypes.arrayOf(PropTypes.shape({
      /**
         * Region option label ("Louisiana", "California")
         */
      label: PropTypes.string,
      /**
         * Region option value ("LA", "CA")
         */
      value: PropTypes.string
    })),
    /**
     * Save/Submit button text.
     */
    saveButtonText: PropTypes.string,
    /**
     * Validator method
     */
    validator: PropTypes.func
  };

  static defaultProps = {
    address: {
      address1: "",
      address2: "",
      country: "",
      city: "",
      firstName: "",
      lastName: "",
      postal: "",
      region: "",
      phone: ""
    },
    components: {
      ButtonComponent: "Button",
      ErrorsBlockComponent: "Errors Block",
      FieldComponent: "Filed",
      PhoneInputComponent: "Phone Input",
      SelectInputComponent: "Select Input",
      TextInputComponent: "Text Input"
    },
    onCancel() {},
    onCountryChange() {},
    onSubmit() {},
    saveButtonText: "Save and continue",
    validator: getRequiredValidator("country", "firstName", "lastName", "address1", "city", "phone", "postal", "region")
  };

  state = {};

  _form = null;

  handleCountryChange = (country) => {
    const { onCountryChange } = this.props;
    onCountryChange(country);
  };

  handleCancel = () => {
    const { onCancel } = this.props;
    onCancel();
  };

  render() {
    const {
      address,
      components: {
        ErrorsBlockComponent,
        FieldComponent,
        TextInputComponent,
        SelectInputComponent,
        PhoneInputComponent,
        ButtonComponent
      },
      countries,
      isCancellable,
      regions,
      saveButtonText,
      validator
    } = this.props;
    return (
      <Form
        ref={(formEl) => {
          this._form = formEl;
        }}
        onSubmit={this.props.onSubmit}
        validator={validator}
        value={address}
      >
        <Grid>
          <ColFull>
            <FieldComponent name="country" label="Country" isRequired>
              <SelectInputComponent
                name="country"
                onChange={this.handleCountryChange}
                options={countries}
                placeholder="Country"
                isSearchable
              />
              <ErrorsBlockComponent names={["country"]} />
            </FieldComponent>
          </ColFull>

          <ColHalf>
            <FieldComponent name="firstName" label="First Name" isRequired>
              <TextInputComponent name="firstName" placeholder="First Name" />
              <ErrorsBlockComponent names={["firstName"]} />
            </FieldComponent>
          </ColHalf>
          <ColHalf>
            <FieldComponent name="lastName" label="Last Name" isRequired>
              <TextInputComponent name="lastName" placeholder="Last Name" />
              <ErrorsBlockComponent names={["lastName"]} />
            </FieldComponent>
          </ColHalf>

          <ColFull>
            <FieldComponent name="address1" label="Address" isRequired>
              <TextInputComponent name="address1" placeholder="Address" />
              <ErrorsBlockComponent names={["address1"]} />
            </FieldComponent>
          </ColFull>

          <ColFull>
            <FieldComponent name="address2" label="Address">
              <TextInputComponent name="address2" placeholder="Address" />
            </FieldComponent>
          </ColFull>

          <ColFull>
            <FieldComponent name="city" label="City">
              <TextInputComponent name="city" placeholder="City" />
              <ErrorsBlockComponent names={["city"]} />
            </FieldComponent>
          </ColFull>

          <ColHalf>
            <FieldComponent name="region" label="Region" isRequired>
              {regions && regions.length > 1 ? (
                <SelectInputComponent name="region" options={regions} placeholder="Region" isSearchable />
              ) : (
                <TextInputComponent name="region" placeholder="Region" />
              )}
              <ErrorsBlockComponent names={["region"]} />
            </FieldComponent>
          </ColHalf>
          <ColHalf>
            <FieldComponent name="postal" label="Postal Code" isRequired>
              <TextInputComponent name="postal" placeholder="Postal Code" />
              <ErrorsBlockComponent names={["postal"]} />
            </FieldComponent>
          </ColHalf>

          <ColFull>
            <FieldComponent name="phone" label="Phone" isRequired>
              <PhoneInputComponent name="phone" placeholder="Phone" />
              <ErrorsBlockComponent names={["phone"]} />
            </FieldComponent>
          </ColFull>
        </Grid>
        <Actions>
          {isCancellable ? (
            <Fragment>
              <ButtonComponent actionType="secondary" onClick={this.handleCancel} isFullWidth isShortHeight>
                Cancel
              </ButtonComponent>
              <ActionsSpacer />
            </Fragment>
          ) : null}
          <ButtonComponent
            onClick={() => {
              this._form.submit();
            }}
            isFullWidth
            isShortHeight
          >
            {saveButtonText}
          </ButtonComponent>
        </Actions>
      </Form>
    );
  }
}

export default AddressForm;
