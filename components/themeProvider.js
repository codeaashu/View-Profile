"use client";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({ children, ...props }) {
  props.defaultTheme = "dark";
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
