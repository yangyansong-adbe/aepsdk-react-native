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
  ViewStyle,
  TextStyle,
  ImageStyle,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import { ContentViewEvent } from "./ContentViewEvent";
import { Component } from "./Component";

// Only attach event listeners for components with interactId
const renderComponent = (
  component: Component,
  onEvent?: (interactId: string, eventName: ContentViewEvent) => void
): React.ReactElement | null => {
  const style = { ...component.style };
  const { interactId } = component;

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
          <Text style={style as TextStyle}>{component.content}</Text>
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
      return (
        <Button
          title={component.content || ""}
          onPress={() => handlePress("clickButton")}
        />
      );

    case "dismissButton":
      if (!component.dismissType || component.dismissType === "none") {
        return null;
      }

      const getDismissStyle = () => {
        const baseStyle = {
          position: "absolute" as const,
          top: 6,
          right: 6,
          zIndex: 1000,
          justifyContent: "center" as const,
          alignItems: "center" as const,
          minWidth: 16,
          minHeight: 16,
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
              width: 16,
              height: 16,
            };
          default:
            return baseStyle;
        }
      };

      const getTextStyle = () => {
        const baseTextStyle = {
          fontSize: 12,
          fontWeight: "bold" as const,
          textAlign: "center" as const,
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
          onPress={() => handlePress("onDismiss")}
        >
          <Text style={getTextStyle()}>{"×"}</Text>
        </TouchableOpacity>
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
  return renderComponent(obj, onEvent);
};
