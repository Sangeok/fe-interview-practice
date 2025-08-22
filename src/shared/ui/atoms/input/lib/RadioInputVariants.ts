import { cva } from "class-variance-authority";

export const RadioInputVariants = cva("w-4 h-4", {
  variants: {
    variant: {
      dark: "border-white text-white",
      light: "border-black text-black",
    },
  },
});
