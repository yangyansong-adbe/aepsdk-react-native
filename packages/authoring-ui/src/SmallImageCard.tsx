import React from "react";
import { convertSmallImageContentToComponent } from "./convertSmallImageContent";
import { ContentView } from "./ContentView";
import { SmallImageContentData, SmallImageContentStyle } from "./types";

export interface SmallImageContentProps {
  data: SmallImageContentData;
  styleOverrides?: SmallImageContentStyle;
  listener?: (interactId: string, eventName: string) => void;
}

export const SmallImageContent: React.FC<SmallImageContentProps> = (
  props: SmallImageContentProps
) => {
  const { data, styleOverrides, listener } = props;
  const component = convertSmallImageContentToComponent(data, styleOverrides);
  return <ContentView obj={component} onEvent={listener} />;
};
