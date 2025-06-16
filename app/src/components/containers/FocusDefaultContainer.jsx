import SpotlightContainerDecorator from "@enact/spotlight/SpotlightContainerDecorator";

export const FocusDefaultContainer = SpotlightContainerDecorator(
  { enterTo: "default-element", preserveId: true },
  "div"
);
