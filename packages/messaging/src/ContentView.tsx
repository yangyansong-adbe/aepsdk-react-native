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
import React, { useEffect, useCallback, useState } from "react";
import { ContentTemplate, TemplateType } from "./ContentProvider";
import {
  SmallImageContent,
  SmallImageContentStyle,
} from "@adobe/react-native-aepui";
import { ContentCardMappingManager } from "./ContentCardMappingManager";
import Messaging from "./Messaging";
import { ContentViewEvent } from "@adobe/react-native-aepui";

export interface ContentViewProps {
  data: ContentTemplate;
  styleOverrides?: {
    smallImageStyle?: SmallImageContentStyle;
  };
  listener?: (
    componentIdentifier: string | null,
    event: ContentViewEvent
  ) => void;
}

export const ContentView: React.FC<ContentViewProps> = ({
  data,
  styleOverrides,
  listener,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const contentCardMapping =
    ContentCardMappingManager.getInstance().getContentCardMapping(data.id);

  // listener?: (interactId: string, eventName: ContentViewEvent) => void;
  // Create a default listener that always listens to all events and forwards to client listener if not null
  const defaultListener = useCallback(
    (componentIdentifier: string | null, event: ContentViewEvent) => {
      // Handle dismiss event by hiding the content view
      if (event === "onDismiss") {
        setIsVisible(false);
      }

      if (event === "clickButton" && contentCardMapping) {
        console.log("trackContentCardInteraction", contentCardMapping);
        Messaging.trackContentCardInteraction(
          contentCardMapping.proposition,
          contentCardMapping.contentCard
        );
      }
      if (event === "onDisplay" && contentCardMapping) {
        console.log("trackContentCardDisplay", contentCardMapping);
        Messaging.trackContentCardDisplay(
          contentCardMapping.proposition,
          contentCardMapping.contentCard
        );
      }

      if (listener) {
        listener(componentIdentifier, event);
      }
    },
    [listener]
  );

  // Call listener on mount to signal view display
  useEffect(() => {
    defaultListener(null, "onDisplay");
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
