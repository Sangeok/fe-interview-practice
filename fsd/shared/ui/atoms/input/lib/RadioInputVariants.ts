import { cva } from "class-variance-authority";

export const RadioInputVariants = cva(
  "w-4 h-4 min-w-4 min-h-4 flex-shrink-0 appearance-none border-2 rounded-full cursor-pointer focus:outline-none  focus:ring-purple-500 checked:bg-purple-500 checked:border-purple-500 relative before:content-[''] before:absolute before:inset-1 before:rounded-full before:bg-white before:opacity-0 checked:before:opacity-100",
  {
    variants: {
      variant: {
        dark: "border-zinc-400 focus:ring-purple-400",
        light: "border-gray-400 focus:ring-purple-500",
      },
    },
  }
);
