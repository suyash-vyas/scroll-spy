// libs
import type { Meta, StoryObj } from "@storybook/react-vite";

// components
import { Demo } from "./Demo";

// types
import type { UseScrollSpyProps } from "../../src/useScrollSpy";

const meta: Meta<UseScrollSpyProps> = {
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
  },
};

export default meta;

type Story = StoryObj<UseScrollSpyProps>;

export const ScrollSpy: Story = {
  args: {
    offset: 50,
  },
};
