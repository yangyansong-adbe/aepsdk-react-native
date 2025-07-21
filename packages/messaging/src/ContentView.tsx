import { useEffect } from "react";
import { ContentTemplate, TemplateType } from "./ContentProvider";
import {
  SmallImageContent,
  SmallImageContentStyle,
} from "@adobe/react-native-aep-authoring-ui";

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
  // Call listener on mount to signal view display
  useEffect(() => {
    if (listener) {
      listener("onDisplay", null);
    }
  }, [listener]);

  switch (data.type) {
    case TemplateType.SMALL_IMAGE:
      if (!data.smallImageData) return null;
      return (
        <SmallImageContent
          data={data.smallImageData}
          styleOverrides={styleOverrides?.smallImageStyle}
          listener={listener}
        />
      );
    default:
      return null;
  }
};
