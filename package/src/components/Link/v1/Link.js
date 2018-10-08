import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { preventAccidentalDoubleClick } from "../../../utils";

const UnstyledLink = styled.a`
  text-decoration: none;
`;

class Link extends Component {
  static propTypes = {
    /**
     * You can provide a `className` prop that will be applied to the outermost DOM element
     * rendered by this component. We do not recommend using this for styling purposes, but
     * it can be useful as a selector in some situations.
     */
    className: PropTypes.string,
    /**
     * The contents of the link, such as text, icons, or any combination of React and HTML components
     */
    children: PropTypes.node.isRequired,
    /**
     * The URL the link should navigate to
     */
    href: PropTypes.string.isRequired,
    /**
     * Called with a single event parameter when a user clicks the link
     */
    onClick: PropTypes.func
  };

  static defaultProps = {
    onClick() {}
  };

  onClick = preventAccidentalDoubleClick((event) => {
    this.props.onClick(event);
  });

  render() {
    const { children, href } = this.props;
    return (
      <UnstyledLink className={this.props.className} href={href} onClick={this.onClick}>{children}</UnstyledLink>
    );
  }
}

export default Link;
