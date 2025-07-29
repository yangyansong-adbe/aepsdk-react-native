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
import React, { useMemo } from "react";
import {
  View,
  Text,
  Image,
  Button,
  TouchableOpacity,
  useColorScheme,
  Linking,
} from "react-native";
import { ContentViewEvent } from "./ContentViewEvent";
import { Component, ComponentTextStyle, ButtonStyle } from "./Component";
import { ViewStyle, ImageStyle } from "react-native";
import { useTheme } from "./ThemeProvider";

/**
 * Renders a dismiss button component with appropriate styling based on dismiss type.
 *
 * @param component - The dismiss button component to render.
 * @param colorScheme - The current color scheme.
 * @param onPress - The press handler function.
 * @returns The rendered dismiss button component or null if dismiss type is "none".
 */
const renderDismissButton = (
  component: Component,
  colorScheme: "light" | "dark",
  onPress: () => void
): React.ReactElement | null => {
  if (!component.dismissType || component.dismissType === "none") {
    return null;
  }

  const getDismissStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      position: "absolute",
      top: 6,
      right: 6,
      zIndex: 1000,
      justifyContent: "center",
      alignItems: "center",
      minWidth: 18,
      minHeight: 18,
    };

    switch (component.dismissType) {
      case "simple":
        return {
          ...baseStyle,
          backgroundColor: "transparent",
        };
      case "circle":
        return {
          ...baseStyle,
          backgroundColor:
            colorScheme === "dark"
              ? "rgba(255,255,255,0.1)"
              : "rgba(0,0,0,0.1)",
          borderRadius: 10,
          width: 18,
          height: 18,
        };
      default:
        return baseStyle;
    }
  };
  const getTextStyle = (): ComponentTextStyle => {
    const baseTextStyle: ComponentTextStyle = {
      color: colorScheme === "dark" ? "white" : "black",
      fontSize: 14,
      fontWeight: "bold",
      textAlign: "center",
    };
    return baseTextStyle;
  };

  return (
    <TouchableOpacity
      style={getDismissStyle()}
      activeOpacity={0.7}
      onPress={onPress}
    >
      <Text style={getTextStyle()}>{"×"}</Text>
    </TouchableOpacity>
  );
};

/**
 * Renders a component based on its type and properties.
 *
 * @param component - The component to render.
 * @param theme - The current theme object.
 * @param colorScheme - The current color scheme.
 * @param onEvent - The event handler function. If provided,
 * it will be called when the component is interacted with the components that have interactId.
 * @returns The rendered component.
 */
const renderComponent = (
  component: Component,
  theme: any,
  colorScheme: "light" | "dark" | null | undefined,
  onEvent?: (interactId: string, eventName: ContentViewEvent) => void
): React.ReactElement | null => {
  const style = { ...component.style };
  const { interactId } = component;

  // Create the handlePress function (no useCallback here since this is not a React component)
  const handlePress = (eventName: ContentViewEvent) => {
    if (interactId && onEvent) {
      onEvent(interactId, eventName);
    }
  };

  switch (component.type) {
    case "view":
      const viewStyle = {
        ...(style as ViewStyle),
        backgroundColor: theme.colors.background,
      };

      return (
        <View style={viewStyle}>
          {component.children?.map((childComponent, index) => (
            <React.Fragment key={index}>
              {renderComponent(childComponent, theme, colorScheme, onEvent)}
            </React.Fragment>
          ))}
        </View>
      );

    case "text":
      const textStyle = {
        ...(style as ComponentTextStyle),
        color: theme.colors.text_primary,
      };

      return (
        <TouchableOpacity activeOpacity={0.7}>
          <Text
            adjustsFontSizeToFit={
              (style as ComponentTextStyle)?.adjustsFontSizeToFit || true
            }
            numberOfLines={(style as ComponentTextStyle)?.numberOfLines || 1}
            style={textStyle}
          >
            {component.content}
          </Text>
        </TouchableOpacity>
      );
    case "title":
      const titleStyle = {
        ...(style as ComponentTextStyle),
        color: theme.colors.text_primary,
      };

      return (
        <TouchableOpacity activeOpacity={0.7}>
          <Text
            adjustsFontSizeToFit={
              (style as ComponentTextStyle)?.adjustsFontSizeToFit || true
            }
            numberOfLines={(style as ComponentTextStyle)?.numberOfLines || 1}
            style={titleStyle}
          >
            {component.content}
          </Text>
        </TouchableOpacity>
      );
    case "body":
      const bodyStyle = {
        ...(style as ComponentTextStyle),
        color: theme.colors.text_secondary,
      };

      return (
        <TouchableOpacity activeOpacity={0.7}>
          <Text
            adjustsFontSizeToFit={
              (style as ComponentTextStyle)?.adjustsFontSizeToFit || true
            }
            numberOfLines={(style as ComponentTextStyle)?.numberOfLines || 1}
            style={bodyStyle}
          >
            {component.content}
          </Text>
        </TouchableOpacity>
      );

    case "image":
      const imageUrl =
        component.darkUrl && colorScheme === "dark"
          ? component.darkUrl
          : component.url;

      const imageStyle = {
        ...(style as ImageStyle),
        backgroundColor: theme.colors.image_placeholder,
      };

      return (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => handlePress("press")}
        >
          <Image style={imageStyle} source={{ uri: imageUrl }} />
        </TouchableOpacity>
      );

    case "button":
      const handleButtonPress = async () => {
        handlePress("clickButton");
        if (component.actionUrl) {
          try {
            await Linking.openURL(component.actionUrl);
          } catch (error) {
            // TODO: add a utility function to handle SDK logs.
            console.warn(`Failed to open URL: ${component.actionUrl}`, error);
          }
        }
      };

      return (
        <View style={style as ButtonStyle}>
          <Button
            title={component.content || ""}
            // color={theme.colors.primary}
            onPress={handleButtonPress}
          />
        </View>
      );

    case "dismissButton":
      return renderDismissButton(component, colorScheme, () =>
        handlePress("onDismiss")
      );

    default:
      return null;
  }
};

// ContentView now accepts onEvent and passes it to renderComponent
export const ContentView = ({
  obj,
  onEvent,
}: {
  obj: Component;
  onEvent?: (interactId: string, eventName: ContentViewEvent) => void;
}) => {
  // Call hooks at the top level of the React component
  const { theme } = useTheme();
  const colorScheme = useColorScheme();

  // Memoize the rendered component for performance
  const renderedComponent = useMemo(() => {
    return renderComponent(obj, theme, colorScheme, onEvent);
  }, [obj, theme, colorScheme, onEvent]);

  return renderedComponent;
};
