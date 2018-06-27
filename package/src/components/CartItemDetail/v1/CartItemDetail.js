import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { applyTheme } from "../../../utils";

const Detail = styled.div`
  flex: 0 0 fit;

  h3 {
    font-family: ${applyTheme("font_family")};
    letter-spacing: 0.3px;
    line-height: 1;
    margin: 0 0 10px;
  }

  a {
    color: ${applyTheme("color_coolGrey500")};
    text-decoration: none;
    &:focus,
    &:hover {
      color: ${applyTheme("color_coolGrey300")};
    }
  }
`;

const Vendor = styled.p`
  color: ${applyTheme("color_black65")};
  display: block;
  font-family: ${applyTheme("font_family")};
  font-size: ${applyTheme("font_size_small")};
  margin: 0;
`;

const Attributes = styled.div`
  margin-bottom: 0.5rem;

  span {
    display: none;

    @media (min-width: 768px) {
      display: inline;
    }
  }
`;

const Attr = styled.p`
  color: ${applyTheme("color_black65")};
  display: inline;
  font-family: ${applyTheme("font_family")};
  font-size: ${applyTheme("font_size_small")};
  margin: 0 0.05rem 0 0;

  &:after {
    content: ",";
  }

  &:last-of-type:after {
    content: "";
  }

  @media (min-width: 768px) {
    display: block;

    &:after {
      content: "";
    }
  }
`;

class CartItemDetail extends Component {
  static propTypes = {
    attributes: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string
    })),
    productSlug: PropTypes.string,
    title: PropTypes.string
  };

  static defaultProps = {};

  renderAttributes() {
    let { attributes } = this.props;
    const { value: vendor } = attributes.find((attr) => attr.label === "vendor");
    attributes = attributes.filter((attr) => attr.label !== "vendor");
    return (
      <Attributes>
        {vendor ? <Vendor>{vendor}</Vendor> : null}
        {attributes.map(({ label, value }) => (
          <Attr key={label}>
            <span>{label}:</span> {value}
          </Attr>
        ))}
      </Attributes>
    );
  }

  render() {
    const { attributes, productSlug, title } = this.props;
    return (
      <Detail>
        <h3>
          <a href={productSlug}>{title}</a>
        </h3>
        {attributes && this.renderAttributes()}
      </Detail>
    );
  }
}

export default CartItemDetail;
