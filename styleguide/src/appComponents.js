import React from "react";
import styled from "styled-components";
import AddressForm from "../../package/src/components/AddressForm/v1";
import Button from "../../package/src/components/Button/v1";
import CartItem from "../../package/src/components/CartItem/v1";
import CartItemDetail from "../../package/src/components/CartItemDetail/v1";
import CartItems from "../../package/src/components/CartItems/v1";
import CartSummary from "../../package/src/components/CartSummary/v1";
import CheckoutAction from "../../package/src/components/CheckoutAction/v1";
import CheckoutActionComplete from "../../package/src/components/CheckoutActionComplete/v1";
import CheckoutActionIncomplete from "../../package/src/components/CheckoutActionIncomplete/v1";
import ErrorsBlock from "../../package/src/components/ErrorsBlock/v1";
import Field from "../../package/src/components/Field/v1";
import MiniCartSummary from "../../package/src/components/MiniCartSummary/v1";
import PhoneNumberInput from "../../package/src/components/PhoneNumberInput/v1";
import Price from "../../package/src/components/Price/v1";
import QuantityInput from "../../package/src/components/QuantityInput/v1";
import Select from "../../package/src/components/Select/v1";
import StockWarning from "../../package/src/components/StockWarning/v1";
import spinner from "../../package/src/utils/spinner";
import TextInput from "../../package/src/components/TextInput/v1";

const FontIcon = styled.i`
  font-size: 1em;
  vertical-align: middle;
`;

/* eslint-disable max-len */
const iconClear = (
  <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 14 14"
    style={{ height: "100%", maxHeight: "100%", verticalAlign: "middle" }}
  >
    <path d="M9.926 9.105l-2.105-2.105 2.105-2.105-0.82-0.82-2.105 2.105-2.105-2.105-0.82 0.82 2.105 2.105-2.105 2.105 0.82 0.82 2.105-2.105 2.105 2.105zM7 1.176c3.227 0 5.824 2.598 5.824 5.824s-2.598 5.824-5.824 5.824-5.824-2.598-5.824-5.824 2.598-5.824 5.824-5.824z" />
  </svg>
);
/* eslint-enable max-len */

export default {
  AddressForm,
  Button,
  CartItem,
  CartItemDetail,
  CartItems,
  CartSummary,
  CheckoutAction,
  CheckoutActionComplete,
  CheckoutActionIncomplete,
  ErrorsBlock,
  Field,
  iconClear,
  iconError: <FontIcon className="fas fa-exclamation-triangle" />,
  iconValid: (<FontIcon className="far fa-check-circle" />),
  MiniCartSummary,
  PhoneNumberInput,
  Price,
  QuantityInput,
  Select,
  spinner,
  StockWarning,
  TextInput
};
