import { cva } from "class-variance-authority";

export const ButtonVariants = cva("px-4 py-1 rounded-md cursor-pointer transition-colors duration-200", {
  variants: {
    variant: {
      dark: "bg-black text-white px-4 py-2 dark-button-hover dark-border",
      light: "bg-white text-black font-semibold px-6 py-3 hover:bg-gray-300",
    },
    size: {
      sm: "text-sm",
      md: "text-base",
    },
  },
  defaultVariants: {
    variant: "dark",
    size: "md",
  },
});
