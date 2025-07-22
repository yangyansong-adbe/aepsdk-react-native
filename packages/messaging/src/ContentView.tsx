import React, { useEffect, useCallback, useState } from "react";
import { ContentTemplate, TemplateType } from "./ContentProvider";
import {
  SmallImageContent,
  SmallImageContentStyle,
} from "@adobe/react-native-aep-authoring-ui";
import { ContentCardMappingManager } from "./ContentCardMappingManager";
import Messaging from "./Messaging";

export interface ContentViewProps {
  data: ContentTemplate;
  styleOverrides?: {
    smallImageStyle?: SmallImageContentStyle;
  };
  listener?: (event: string, componentIdentifier: string | null) => void;
}

export const ContentView: React.FC<ContentViewProps> = ({
  data,
  styleOverrides,
  listener,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const contentCardMapping =
    ContentCardMappingManager.getInstance().getContentCardMapping(data.id);

  // Create a default listener that always listens to all events and forwards to client listener if not null
  const defaultListener = useCallback(
    (event: string, componentIdentifier: string | null) => {
      // Handle dismiss event by hiding the content view
      if (event === "dismiss") {
        setIsVisible(false);
      }

      if (event == "press" && contentCardMapping) {
        Messaging.trackContentCardInteraction(
          contentCardMapping.proposition,
          contentCardMapping.contentCard
        );
      }

      if (listener) {
        listener(event, componentIdentifier);
      }
    },
    [listener]
  );

  // Call listener on mount to signal view display
  useEffect(() => {
    defaultListener("onDisplay", null);
    if (contentCardMapping) {
      Messaging.trackContentCardDisplay(
        contentCardMapping.proposition,
        contentCardMapping.contentCard
      );
    }
  }, [defaultListener]);

  // If not visible, return null to hide the entire view
  if (!isVisible) {
    return null;
  }

  switch (data.type) {
    case TemplateType.SMALL_IMAGE:
      if (!data.smallImageData) return null;
      return (
        <SmallImageContent
          data={data.smallImageData}
          styleOverrides={styleOverrides?.smallImageStyle}
          listener={defaultListener}
        />
      );
    default:
      return null;
  }
};
