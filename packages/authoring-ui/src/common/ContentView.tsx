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
import React from "react";
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

/**
 * Renders a dismiss button component with appropriate styling based on dismiss type.
 *
 * @param component - The dismiss button component to render.
 * @param onPress - The press handler function.
 * @returns The rendered dismiss button component or null if dismiss type is "none".
 */
const renderDismissButton = (
  component: Component,
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
          backgroundColor: "rgba(0,0,0,0.1)",
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
      fontSize: 12,
      fontWeight: "bold",
      textAlign: "center",
    };

    switch (component.dismissType) {
      case "simple":
        return {
          ...baseTextStyle,
          color: "#666666",
        };
      case "circle":
        return {
          ...baseTextStyle,
          color: "#333333",
        };
      default:
        return baseTextStyle;
    }
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
 * @param onEvent - The event handler function. If provided,
 * it will be called when the component is interacted with the components that have interactId.
 * @returns The rendered component.
 */
const renderComponent = (
  component: Component,
  onEvent?: (interactId: string, eventName: ContentViewEvent) => void
): React.ReactElement | null => {
  const style = { ...component.style };
  const { interactId } = component;

  // The content card will not be refreshed, so we don't need to memoize the handlePress function
  const handlePress = (eventName: ContentViewEvent) => {
    if (interactId && onEvent) {
      onEvent(interactId, eventName);
    }
  };

  switch (component.type) {
    case "view":
      return (
        <View style={style as ViewStyle}>
          {component.children?.map((childComponent, index) => (
            <React.Fragment key={index}>
              {renderComponent(childComponent, onEvent)}
            </React.Fragment>
          ))}
        </View>
      );

    case "text":
      return (
        <TouchableOpacity activeOpacity={0.7}>
          <Text
            adjustsFontSizeToFit={
              (style as ComponentTextStyle)?.adjustsFontSizeToFit || true
            }
            numberOfLines={(style as ComponentTextStyle)?.numberOfLines || 1}
            style={style as ComponentTextStyle}
          >
            {component.content}
          </Text>
        </TouchableOpacity>
      );

    case "image":
      const colorScheme = useColorScheme();
      const imageUrl =
        component.darkUrl && colorScheme === "dark"
          ? component.darkUrl
          : component.url;

      return (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => handlePress("press")}
        >
          <Image style={style as ImageStyle} source={{ uri: imageUrl }} />
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
            color="#007AFF"
            onPress={handleButtonPress}
          />
        </View>
      );

    case "dismissButton":
      return renderDismissButton(component, () => handlePress("onDismiss"));

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
  return renderComponent(obj, onEvent);
};
