import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ButtonBase from "@material-ui/core/ButtonBase";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import Minus from "mdi-material-ui/Minus";
import Plus from "mdi-material-ui/Plus";
import { applyTheme } from "../../../utils";

const styles = (theme) => ({
  incrementButton: {
    backgroundColor: "#fafafa",
    boxSizing: "inherit",
    color: "#666666",
    fontSize: "12px",
    padding: 6
  },
  quantityContainer: {
    border: `1px solid #d9d9d9`,
    borderRadius: "2px",
    boxSizing: "border-box",
    overflow: "hidden",
    padding: 0
  },
  quantityInput: {
    borderLeft: `1px solid #d9d9d9`,
    borderRight: `1px solid #d9d9d9`,
    boxSizing: "inherit",
    color: "#3c3c3c",
    fontSize: "12px",
    maxWidth: "40px",
    textAlign: "center",
    "&:focus": {
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)"
    }
  }
});

class QuantityInput extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);

    const value = props.value || 0;

    this.state = {
      initialValue: props.value,
      value
    };
  }

  handleQuantityInputChange = (event) => {
    const { value } = event.target;

    const numericValue = Math.floor(Number(value));

    if (Number.isNaN(numericValue)) {
      return null;
    }

    return this.setState({ value: numericValue });
  };

  handleIncrementButton = () => {
    const value = this.state.value + 1;

    this.setState({ value });
  };

  handleDecrementButton = () => {
    const value = this.state.value - 1;

    if (value >= 0) {
      this.setState({ value });
    }
  };

  render() {
    const { classes: { incrementButton, quantityContainer, quantityInput } } = this.props;
    const { value } = this.state;
    return (
      <TextField
        id="addToCartQuantityInput"
        value={value}
        onChange={this.handleQuantityInputChange}
        InputProps={{
          startAdornment: (
            <InputAdornment>
              <ButtonBase
                color="default"
                variant="outlined"
                onClick={this.handleDecrementButton}
                className={incrementButton}
              >
                <Minus />
              </ButtonBase>
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment>
              <ButtonBase
                variant="outlined"
                color="default"
                onClick={this.handleIncrementButton}
                className={incrementButton}
              >
                <Plus />
              </ButtonBase>
            </InputAdornment>
          ),
          disableUnderline: true,
          classes: {
            root: quantityContainer,
            input: quantityInput
          }
        }}
      />
    );
  }
}

export default withStyles(styles)(QuantityInput);

//export default QuantityInput;
