// libs
import type { Meta, StoryObj } from "@storybook/react-vite";

// components
import { Demo } from "./Demo";

// types
import type { UseScrollSpyProps } from "../../src/useScrollSpy";

export type StoryProps = UseScrollSpyProps & {
  showObservedArea: boolean;
};

const meta: Meta<StoryProps> = {
  component: Demo,
  argTypes: {
    offset: {
      control: {
        type: "range",
        min: 50,
        max: 700,
        step: 1,
      },
    },
    showObservedArea: {
      control: {
        type: "boolean",
      },
    },
  },
};

export const ScrollSpy: StoryObj<StoryProps> = {
  args: {
    offset: 50,
    showObservedArea: true,
  },
};

export default meta;
