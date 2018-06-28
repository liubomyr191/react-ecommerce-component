import React from "react";
import renderer from "react-test-renderer";
import CartItemDetail from "./CartItemDetail";

test("basic snapshot without props", () => {
  const component = renderer.create(<CartItemDetail />);

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("basic snapshot with props", () => {
  const attributes = [{ label: "Color", value: "Red" }, { label: "Size", value: "Medium" }];
  const component = renderer.create(<CartItemDetail title="Mock Product Title" productSlug="/product-slug" attributes={attributes} />);

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("basic snapshot with vendor attribute", () => {
  const attributes = [
    { label: "vendor", value: "Patagonia" },
    { label: "Color", value: "Red" },
    { label: "Size", value: "Medium" }
  ];
  const component = renderer.create(<CartItemDetail title="Mock Product Title" productSlug="/product-slug" attributes={attributes} />);

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
