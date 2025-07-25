/*
    Copyright 2025 Adobe. All rights reserved.
    This file is licensed to you under the Apache License, Version 2.0 (the
    "License"); you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0 Unless required by applicable law
    or agreed to in writing, software distributed under the License is
    distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS OF
    ANY KIND, either express or implied. See the License for the specific
    language governing permissions and limitations under the License.
*/
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useMemo,
} from "react";
import { useColorScheme } from "react-native";
import { Theme, Themes } from "./Theme";

interface ThemeProviderProps {
  children: ReactNode;
  customThemes: Themes;
}

interface ThemeContextType {
  theme: Theme;
}

const defaultTheme: Themes = {
  light: {
    colors: {
      primary: "#007AFF",
      secondary: "#5856D6",
      background: "#FFFFFF",
      text_primary: "#000000",
      text_secondary: "#8E8E93",
      title_background: "#F2F2F7",
      body_background: "#FFFFFF",
      image_placeholder: "#C7C7CC",
    },
  },
  dark: {
    colors: {
      primary: "#0A84FF",
      secondary: "#5E5CE6",
      background: "#000000",
      text_primary: "#FFFFFF",
      text_secondary: "#8E8E93",
      title_background: "#1C1C1E",
      body_background: "#000000",
      image_placeholder: "#48484A",
    },
  },
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({
  children,
  customThemes,
}: ThemeProviderProps) => {
  const systemColorScheme = useColorScheme();

  // Memoize the merged themes to avoid recreation on every render
  const mergedThemes: Themes = useMemo(
    () => ({
      light: {
        colors: {
          ...defaultTheme.light.colors,
          ...(customThemes?.light?.colors || {}),
        },
      },
      dark: {
        colors: {
          ...defaultTheme.dark.colors,
          ...(customThemes?.dark?.colors || {}),
        },
      },
    }),
    [customThemes]
  );

  // Memoize the active theme
  const activeTheme = useMemo(() => {
    return mergedThemes[systemColorScheme] || mergedThemes.light;
  }, [mergedThemes, systemColorScheme]);

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue: ThemeContextType = useMemo(
    () => ({
      theme: activeTheme,
    }),
    [activeTheme]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
