import SpotlightContainerDecorator from "@enact/spotlight/SpotlightContainerDecorator";

export const DefaultContainer = SpotlightContainerDecorator(
  {
    preserveId: true,
  },
  "div"
);
