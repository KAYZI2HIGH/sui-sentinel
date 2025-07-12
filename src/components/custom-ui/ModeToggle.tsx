"use client";

import { useTheme } from "next-themes";

import { ThemeSwitcher } from "./ThemeSwitcher";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <ThemeSwitcher
      value={theme as "light" | "dark" | "system"}
      defaultValue={theme as "light" | "dark" | "system"}
      onChange={setTheme}
    />
  );
}
