import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { addTypographyStyles, applyTheme } from "../../../utils";

const Detail = styled.div`
  flex: 0 0 fit;
`;

const Title = styled.h3`
  ${addTypographyStyles("CartItemDetailTitle", "headingTextBold")}
  margin-top: ${applyTheme("cartItemDetailTitleMarginTop")};
  margin-bottom: ${applyTheme("cartItemDetailTitleMarginBottom")};
  margin-left: ${applyTheme("cartItemDetailTitleMarginLeft")};
  margin-right: ${applyTheme("cartItemDetailTitleMarginRight")};

  a {
    ${addTypographyStyles("CartItemDetailTitle", "headingTextBold")}
    text-decoration: none;
    &:focus,
    &:hover {
      color: ${applyTheme("cartItemDetailTitleColor_focus")};
    }
  }
`;

const Text = styled.p`
  ${addTypographyStyles("CartItemDetailAttributes", "labelText")}
  margin: 0;
`;

const Attributes = styled.div`
  margin-bottom: 0.5rem;
`;

const Attr = styled.p`
  ${addTypographyStyles("CartItemDetailAttributes", "labelText")}
  margin: 0;
`;

class CartItemDetail extends Component {
  static propTypes = {
    /**
     * Array of additional attributes of the chosen item.
     */
    attributes: PropTypes.arrayOf(PropTypes.shape({
      /**
       * Attribute label (i.e. "Color").
       */
      label: PropTypes.string,
      /**
       * Attribute value (i.e. "Red").
       */
      value: PropTypes.string
    })),
    /**
     * Is in a MiniCart component
     */
    isMiniCart: PropTypes.bool,
    /**
     * Product slug of chosen item.
     */
    productSlug: PropTypes.string,
    /**
     * Product vendor of chosen item.
     */
    productVendor: PropTypes.string,
    /**
     * Item quantity
     */
    quantity: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /**
     * Product title of chosen item.
     */
    title: PropTypes.string
  };

  renderBlockAttributes() {
    const { attributes } = this.props;

    return (attributes || []).map(({ label, value }) => {
      if (!label && !value) return null;

      // For now, due to strange implementation of attributes/options in the product data,
      // we allow labels without values and values without labels.
      return (
        <Attr key={label || value}>
          {label ? <span>{label}:</span> : null} {value}
        </Attr>
      );
    });
  }

  renderInlineAttributes() {
    const { attributes } = this.props;
    if (!attributes || !attributes.length) return null;

    const values = attributes.map(({ value }) => value).filter((value) => !!value);
    return (
      <Attr>{values.join(", ")}</Attr>
    );
  }

  renderAttributes() {
    const { attributes, isMiniCart, productVendor, quantity } = this.props;

    if ((!attributes || attributes.length === 0) && !productVendor) return null;

    return (
      <Attributes isMiniCart={isMiniCart}>
        {productVendor ? <Text>{productVendor}</Text> : null}
        {isMiniCart ? this.renderInlineAttributes() : this.renderBlockAttributes()}
        {quantity ? <Text>Quantity: {quantity}</Text> : null}
      </Attributes>
    );
  }

  render() {
    const { productSlug, title } = this.props;
    return (
      <Detail>
        <Title>
          <a href={productSlug}>{title}</a>
        </Title>
        {this.renderAttributes()}
      </Detail>
    );
  }
}

export default CartItemDetail;
