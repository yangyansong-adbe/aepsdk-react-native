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

// Define types for our JSON structure
import { Component } from "./Component";

// Only attach event listeners for components with interactId
const renderComponent = (
  component: Component,
  onEvent?: (interactId: string, eventName: string) => void
): React.ReactElement | null => {
  // console.log('component', component);
  const style = { ...component.style };
  const { interactId } = component;

  // Unified event handler
  const handlePress = (eventName: string) => {
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
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => handlePress("press")}
        >
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
          onPress={() => handlePress("press")}
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
          onPress={() => handlePress("dismiss")}
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
  onEvent?: (interactId: string, eventName: string) => void;
}) => {
  return renderComponent(obj, onEvent);
};
