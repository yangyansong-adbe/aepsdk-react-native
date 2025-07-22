/*
Copyright 2024 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import React, { useState } from "react";
import { View, ScrollView, TouchableOpacity, Text, Modal } from "react-native";
import {
  ContentProvider,
  ContentTemplate,
  ContentView,
} from "@adobe/react-native-aepmessaging";
import { useEffect } from "react";

const ContentCardView = () => {
  const [content, setContent] = useState<ContentTemplate[] | null>(null);
  const [selectedView, setSelectedView] = useState<string>("SmallImage");
  const [showPicker, setShowPicker] = useState<boolean>(false);

  const viewOptions = ["SmallImage", "LargeImage", "ImageOnly"];

  useEffect(() => {
    // Messaging.updatePropositionsForSurfaces(['someSurface']);
    // Note:
    // - Call above to update the propositions and cache the content locally
    // - Customers may call this function when launching the app

    const provider = new ContentProvider("cardstab");
    provider
      .getContent()
      .then(setContent)
      .catch((err) => console.error(err.message))
      .finally(() => console.log("Content loaded"));
  }, []);

  return (
    <View>
      <View style={{ marginTop: 75, marginHorizontal: 20, marginBottom: 20 }}>
        <TouchableOpacity
          style={{
            height: 50,
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 5,
            justifyContent: "center",
            paddingHorizontal: 10,
            backgroundColor: "#fff",
          }}
          onPress={() => setShowPicker(true)}
        >
          <Text style={{ fontSize: 16 }}>{selectedView}</Text>
        </TouchableOpacity>

        <Modal visible={showPicker} transparent={true} animationType="slide">
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0,0,0,0.5)",
            }}
          >
            <View
              style={{
                backgroundColor: "white",
                padding: 20,
                borderRadius: 10,
                width: "80%",
              }}
            >
              {viewOptions.map((option) => (
                <TouchableOpacity
                  key={option}
                  style={{
                    paddingVertical: 10,
                    borderBottomWidth: 1,
                    borderBottomColor: "#eee",
                  }}
                  onPress={() => {
                    setSelectedView(option);
                    setShowPicker(false);
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      color: selectedView === option ? "#007AFF" : "#000",
                    }}
                  >
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
              <TouchableOpacity
                style={{
                  paddingVertical: 10,
                  marginTop: 10,
                }}
                onPress={() => setShowPicker(false)}
              >
                <Text style={{ fontSize: 16, color: "#FF3B30" }}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>

      <ScrollView contentContainerStyle={{ marginRight: 20 }}>
        {selectedView === "SmallImage" && (
          <View>
            {/* <View style={{ height: 200 }}>
              {content?.map((item, idx) => (
                <ContentView key={idx} data={item} />
              ))}
            </View> */}
            <View>
              {content?.map((item, idx) => (
                <ContentView
                  key={idx}
                  data={item}
                  styleOverrides={{
                    smallImageStyle: {
                      title: {
                        color: "#8e44ad",
                      },
                    },
                  }}
                  listener={(event, identifier) => {
                    console.log("Event triggered:", event, identifier);
                  }}
                />
              ))}
            </View>
            {/* <View>
              {content?.map((item, idx) => (
                <ContentView
                  key={idx}
                  data={item}
                  styleOverrides={{
                    smallImageStyle: {
                      container: {
                        flexDirection: "row-reverse",
                      },
                    },
                  }}
                  listener={(event, identifier) => {
                    console.log("Event triggered:", event, identifier);
                  }}
                />
              ))}
            </View>
            <View>
              {content?.map((item, idx) => (
                <ContentView
                  key={idx}
                  data={item}
                  styleOverrides={{
                    smallImageStyle: {
                      buttonContainer: {
                        justifyContent: "flex-start",
                      },
                    },
                  }}
                  listener={(event, identifier) => {
                    console.log("Event triggered:", event, identifier);
                  }}
                />
              ))}
            </View> */}
          </View>
        )}

        {selectedView === "LargeImage" && (
          <View
            style={{
              padding: 20,
              backgroundColor: "#f8f9fa",
              borderRadius: 10,
              marginBottom: 20,
            }}
          >
            <Text
              style={{
                fontSize: 24,
                fontWeight: "bold",
                color: "#2c3e50",
                marginBottom: 10,
              }}
            >
              Large Image View
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: "#7f8c8d",
                lineHeight: 24,
              }}
            >
              This is the Large Image content view. Here you can display large
              image content cards with enhanced visual presentation and detailed
              information.
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: "#95a5a6",
                marginTop: 15,
                fontStyle: "italic",
              }}
            >
              Large image cards typically feature prominent imagery with
              supporting text and call-to-action buttons.
            </Text>
          </View>
        )}

        {selectedView === "ImageOnly" && (
          <View
            style={{
              padding: 20,
              backgroundColor: "#e8f4fd",
              borderRadius: 10,
              marginBottom: 20,
            }}
          >
            <Text
              style={{
                fontSize: 24,
                fontWeight: "bold",
                color: "#2980b9",
                marginBottom: 10,
              }}
            >
              Image Only View
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: "#34495e",
                lineHeight: 24,
              }}
            >
              This is the Image Only content view. Perfect for displaying visual
              content without additional text elements, focusing purely on
              imagery.
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: "#7f8c8d",
                marginTop: 15,
                fontStyle: "italic",
              }}
            >
              Image only cards are ideal for visual storytelling and brand
              awareness campaigns.
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default ContentCardView;
