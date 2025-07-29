/*
Copyright 2025 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import React, { useState } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  Modal,
  Appearance,
  ColorSchemeName,
} from "react-native";
import {
  ContentProvider,
  ContentTemplate,
  ContentView,
} from "@adobe/react-native-aepmessaging";
import { useEffect } from "react";
import {
  TemplateType,
  ThemeProvider,
  Themes,
} from "@adobe/react-native-aepmessaging";
import { useColorScheme } from "../hooks/useColorScheme";

const ContentCardView = () => {
  const [content, setContent] = useState<ContentTemplate[] | null>(null);
  const [selectedView, setSelectedView] = useState<string>("SmallImage");
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const [selectedTheme, setSelectedTheme] = useState<string>("System");
  const colorScheme = useColorScheme();

  const viewOptions = ["SmallImage", "LargeImage", "ImageOnly"];
  const themeOptions: Array<{
    label: string;
    value: ColorSchemeName;
  }> = [
    { label: "Light", value: "light" },
    { label: "Dark", value: "dark" },
    { label: "System", value: null },
  ];

  const handleThemeChange = (theme: string, value: ColorSchemeName) => {
    setSelectedTheme(theme);
    Appearance.setColorScheme(value);
  };

  const renderStyledText = (text: string) => {
    return (
      <Text style={{ color: "blue", textAlign: "center", fontSize: 20 }}>
        {text}
      </Text>
    );
  };

  useEffect(() => {
    // Messaging.updatePropositionsForSurfaces(['someSurface']);
    // Note:
    // - Call above to update the propositions and cache the content locally
    // - Customers may call this function when launching the app

    // const provider = new ContentProvider("card/ms");
    const provider = new ContentProvider("cardstab");
    provider
      .getContent()
      .then(setContent)
      .catch((err) => console.error(err.message))
      .finally(() => console.log("Content loaded"));
  }, []);

  return (
    <View>
      {/* Theme Switcher */}
      <View
        style={{
          marginTop: 60,
          marginBottom: 15,
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: "65%",
            backgroundColor: colorScheme === "dark" ? "#3A3A3A" : "#E8E8E8",
            borderRadius: 12,
            padding: 4,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {themeOptions.map((option) => (
            <TouchableOpacity
              key={option.label}
              style={{
                flex: 1,
                paddingVertical: 8,
                paddingHorizontal: 12,
                borderRadius: 8,
                marginHorizontal: 1,
                backgroundColor:
                  selectedTheme === option.label
                    ? colorScheme === "dark"
                      ? "#4A4A4A"
                      : "#FFFFFF"
                    : "transparent",
                alignItems: "center",
                justifyContent: "center",
                shadowColor:
                  selectedTheme === option.label ? "#000" : "transparent",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: selectedTheme === option.label ? 0.1 : 0,
                shadowRadius: 2,
                elevation: selectedTheme === option.label ? 2 : 0,
              }}
              onPress={() => handleThemeChange(option.label, option.value)}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: selectedTheme === option.label ? "600" : "400",
                  color: colorScheme === "dark" ? "#FFFFFF" : "#000000",
                }}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* View Selector */}
      <View style={{ marginHorizontal: 20, marginBottom: 20 }}>
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
            {/* <View>
              {content?.map((item, idx) => (
                <View key={idx} style={{ height: 180 }}>
                  <ContentView
                    key={idx}
                    data={item}
                    styleOverrides={{
                      smallImageStyle: {
                        title: {
                          numberOfLines: 1,
                          color: "#8e44ad",
                        },
                        body: {
                          numberOfLines: 4,
                        },
                      },
                    }}
                    listener={(event, identifier) => {
                      console.log("Event triggered:", event, identifier);
                    }}
                  />
                </View>
              ))}
            </View> */}
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
            <View>
              {renderStyledText("Basic: all fields")}
              <ContentView
                key="1"
                data={SMALL_IMAGE_CONTENT_ALL_FIELDS}
                cardHeight={100}
                listener={(event, identifier) => {
                  console.log("Event triggered:", event, identifier);
                }}
              />
              {renderStyledText("Custom theme")}
              <ThemeProvider
                customThemes={{
                  light: {
                    colors: {
                      text_primary: "red",
                      background: "lightgreen",
                    },
                  },
                  dark: {
                    colors: {
                      text_primary: "green",
                      background: "lightblue",
                    },
                  },
                }}
              >
                <ContentView
                  key="1"
                  data={SMALL_IMAGE_CONTENT_ALL_FIELDS}
                  listener={(event, identifier) => {
                    console.log("Event triggered:", event, identifier);
                  }}
                />
              </ThemeProvider>

              {renderStyledText("No dismiss button")}
              <ContentView
                key="11"
                data={SMALL_IMAGE_CONTENT_NO_DISMISS_BUTTON}
              />
              {renderStyledText("Dismiss button (simple)")}
              <ContentView
                key="12"
                data={SMALL_IMAGE_CONTENT_DISMISS_BUTTON_SIMPLE}
              />
              {renderStyledText("Invalid image")}
              <ContentView key="2" data={SMALL_IMAGE_CONTENT_INVALID_IMAGE} />
              {renderStyledText("image (darkUrl)")}
              <ContentView key="3" data={SMALL_IMAGE_CONTENT_IMAGE_DARK_URL} />
              {renderStyledText("title (2 lines), body (4 lines)")}
              <ContentView
                key="4"
                data={SMALL_IMAGE_CONTENT_IMAGE_DARK_URL}
                styleOverrides={{
                  smallImageStyle: {
                    title: {
                      numberOfLines: 2,
                    },
                    body: {
                      numberOfLines: 4,
                    },
                  },
                }}
                listener={(event, identifier) => {
                  console.log("Event triggered:", event, identifier);
                }}
              />
              {renderStyledText("3 buttons")}
              <ContentView key="5" data={SMALL_IMAGE_CONTENT_3_BUTTONS} />
              {renderStyledText("height (150) title (1 line), body (1 line)")}
              <View style={{ height: 150 }}>
                <ContentView
                  key="6"
                  data={SMALL_IMAGE_CONTENT_IMAGE_DARK_URL}
                  styleOverrides={{
                    smallImageStyle: {
                      title: {
                        numberOfLines: 1,
                      },
                      body: {
                        numberOfLines: 1,
                      },
                    },
                  }}
                />
              </View>
              {renderStyledText("image width (50%)")}
              <View style={{ height: 200 }}>
                <ContentView
                  key="6"
                  data={SMALL_IMAGE_CONTENT_IMAGE_DARK_URL}
                  styleOverrides={{
                    smallImageStyle: {
                      title: {
                        numberOfLines: 1,
                      },
                      body: {
                        numberOfLines: 4,
                      },
                      imageContainer: {
                        width: "50%",
                      },
                    },
                  }}
                />
              </View>

              {renderStyledText(
                "No button, image width (40%), title (2 lines), body (6 lines), height (180)"
              )}
              <View style={{ height: 180 }}>
                <ContentView
                  key="7"
                  data={SMALL_IMAGE_CONTENT_NO_BUTTON}
                  styleOverrides={{
                    smallImageStyle: {
                      title: {
                        numberOfLines: 2,
                      },
                      body: {
                        numberOfLines: 6,
                      },
                      imageContainer: {
                        width: "40%",
                      },
                    },
                  }}
                />
              </View>
              {renderStyledText("No button, image (right aligned)")}
              <View style={{ height: 180 }}>
                <ContentView
                  key="8"
                  data={SMALL_IMAGE_CONTENT_NO_BUTTON}
                  styleOverrides={{
                    smallImageStyle: {
                      title: {
                        numberOfLines: 2,
                      },
                      body: {
                        numberOfLines: 6,
                      },
                      container: {
                        flexDirection: "row-reverse",
                      },
                      imageContainer: {
                        width: "40%",
                      },
                    },
                  }}
                />
              </View>

              <View style={{ height: 200 }} />
            </View>
          </View>
        )}

        {selectedView === "LargeImage" && (
          <View>
            {renderStyledText("basic")}
            <ContentView key="1" data={LARGE_IMAGE_CONTENT_ALL_FIELDS} />
          </View>
        )}

        {selectedView === "ImageOnly" && (
          <View>
            {renderStyledText("basic")}
            <ContentView key="1" data={IMAGE_ONLY_CONTENT_ALL_FIELDS} />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default ContentCardView;

const SMALL_IMAGE_CONTENT_ALL_FIELDS: ContentTemplate = {
  id: "small-image-all-fields",
  type: TemplateType.SMALL_IMAGE,
  smallImageData: {
    image: {
      alt: "",
      url: "https://cdn-icons-png.flaticon.com/256/3303/3303838.png",
      darkUrl: "https://cdn-icons-png.flaticon.com/256/3303/3303838.png",
    },
    buttons: [
      {
        interactId: "downloadClicked",
        actionUrl: "https://nba.com",
        id: "5b4d53f5-45bd-4e5c-a5cb-6e650b1993f6",
        text: {
          content: "Download App",
        },
      },
      {
        interactId: "OK",
        id: "5b4d53f5-45bd-4e5c-a5cb-6e650b1993f6",
        text: {
          content: "OK",
        },
      },
    ],
    dismissBtn: {
      style: "circle",
    },
    actionUrl: "",
    body: {
      content:
        "Get live scores, real-time updates, and exclusive content right at your fingertips.",
    },
    title: {
      content: "Stay connected to all the action",
    },
  },
};
const SMALL_IMAGE_CONTENT_NO_DISMISS_BUTTON: ContentTemplate = {
  id: "small-image-all-fields",
  type: TemplateType.SMALL_IMAGE,
  smallImageData: {
    image: {
      alt: "",
      url: "https://cdn-icons-png.flaticon.com/256/3303/3303838.png",
      darkUrl: "https://cdn-icons-png.flaticon.com/256/3303/3303838.png",
    },
    buttons: [
      {
        interactId: "downloadClicked",
        actionUrl: "https://nba.com",
        id: "5b4d53f5-45bd-4e5c-a5cb-6e650b1993f6",
        text: {
          content: "Download App",
        },
      },
    ],
    actionUrl: "",
    body: {
      content:
        "Get live scores, real-time updates, and exclusive content right at your fingertips.",
    },
    title: {
      content: "Stay connected to all the action",
    },
  },
};

const SMALL_IMAGE_CONTENT_DISMISS_BUTTON_SIMPLE: ContentTemplate = {
  id: "small-image-dismiss-button-simple",
  type: TemplateType.SMALL_IMAGE,
  smallImageData: {
    image: {
      alt: "",
      url: "https://cdn-icons-png.flaticon.com/256/3303/3303838.png",
      darkUrl: "https://cdn-icons-png.flaticon.com/256/3303/3303838.png",
    },
    buttons: [
      {
        interactId: "downloadClicked",
        actionUrl: "https://nba.com",
        id: "5b4d53f5-45bd-4e5c-a5cb-6e650b1993f6",
        text: {
          content: "Download App",
        },
      },
      {
        interactId: "OK",
        id: "5b4d53f5-45bd-4e5c-a5cb-6e650b1993f6",
        text: {
          content: "OK",
        },
      },
    ],
    dismissBtn: {
      style: "simple",
    },
    actionUrl: "",
    body: {
      content:
        "Get live scores, real-time updates, and exclusive content right at your fingertips.",
    },
    title: {
      content: "Stay connected to all the action",
    },
  },
};

const SMALL_IMAGE_CONTENT_INVALID_IMAGE: ContentTemplate = {
  id: "small-image-invalid-image",
  type: TemplateType.SMALL_IMAGE,
  smallImageData: {
    body: {
      content:
        "🎟️ Tickets are on sale now! Don’t miss out on securing your seat to witness the high-flying action from the best players in the game",
    },
    title: {
      content: "Get Ready for the Basketball Season Kickoff!",
    },
    buttons: [
      {
        interactId: "buy",
        id: "5b4d53f5-45bd-4e5c-a5cb-6e650b1993f6",
        actionUrl: "https://nba.com",
        text: {
          content: "Get Season Pass",
        },
      },
    ],
    actionUrl: "",
    dismissBtn: {
      style: "circle",
    },
    image: {
      darkUrl:
        "https://static-00.iconduck.com/assets.00/basketball-icon-256x256-vydm63md.png",
      alt: "",
      url: "https://static-00.iconduck.com/assets.00/basketball-icon-256x256-vydm63md.png",
    },
  },
};

const SMALL_IMAGE_CONTENT_IMAGE_DARK_URL: ContentTemplate = {
  id: "small-image-invalid-image",
  type: TemplateType.SMALL_IMAGE,
  smallImageData: {
    body: {
      content:
        "🎟️ Tickets are on sale now! Don’t miss out on securing your seat to witness the high-flying action from the best players in the game",
    },
    title: {
      content: "Get Ready for the Basketball Season Kickoff!",
    },
    buttons: [
      {
        interactId: "buy",
        id: "5b4d53f5-45bd-4e5c-a5cb-6e650b1993f6",
        actionUrl: "https://nba.com",
        text: {
          content: "Get Season Pass",
        },
      },
    ],
    actionUrl: "",
    dismissBtn: {
      style: "circle",
    },
    image: {
      darkUrl:
        "https://hips.hearstapps.com/hmg-prod/images/golden-retriever-dog-royalty-free-image-505534037-1565105327.jpg?crop=0.760xw:1.00xh;0.204xw,0&resize=980:*",
      alt: "",
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRT8gAa1wUx9Ox2M6cZNwUJe32xE-l_4oqPVA&s",
    },
  },
};
const SMALL_IMAGE_CONTENT_3_BUTTONS: ContentTemplate = {
  id: "small-image-invalid-image",
  type: TemplateType.SMALL_IMAGE,
  smallImageData: {
    body: {
      content:
        "🎟️ Tickets are on sale now! Don’t miss out on securing your seat to witness the high-flying action from the best players in the game",
    },
    title: {
      content: "Get Ready for the Basketball Season Kickoff!",
    },
    buttons: [
      {
        interactId: "buy",
        id: "5b4d53f5-45bd-4e5c-a5cb-6e650b1993f6",
        actionUrl: "https://nba.com",
        text: {
          content: "Buy",
        },
      },
      {
        interactId: "ok",
        id: "5b4d53f5-45bd-4e5c-a5cb-6e650b1993f6",
        actionUrl: "https://nba.com",
        text: {
          content: "OK",
        },
      },
      {
        interactId: "more",
        id: "5b4d53f5-45bd-4e5c-a5cb-6e650b1993f6",
        actionUrl: "https://nba.com",
        text: {
          content: "More",
        },
      },
    ],
    actionUrl: "",
    dismissBtn: {
      style: "circle",
    },
    image: {
      alt: "",
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRT8gAa1wUx9Ox2M6cZNwUJe32xE-l_4oqPVA&s",
    },
  },
};
const SMALL_IMAGE_CONTENT_NO_BUTTON: ContentTemplate = {
  id: "small-image-invalid-image",
  type: TemplateType.SMALL_IMAGE,
  smallImageData: {
    body: {
      content:
        "🎟️ Tickets are on sale now! Don’t miss out on securing your seat to witness the high-flying action from the best players in the game",
    },
    title: {
      content: "Get Ready for the Basketball Season Kickoff!",
    },
    buttons: [],
    actionUrl: "",
    dismissBtn: {
      style: "circle",
    },
    image: {
      alt: "",
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRT8gAa1wUx9Ox2M6cZNwUJe32xE-l_4oqPVA&s",
    },
  },
};

const LARGE_IMAGE_CONTENT_ALL_FIELDS: ContentTemplate = {
  id: "large-image-all-fields",
  type: TemplateType.LARGE_IMAGE,
  largeImageData: {
    actionUrl: "https://cardaction.com",
    body: {
      content: "This is large image body",
    },
    buttons: [
      {
        id: "a41d1bff-2797-4958-a6d7-2b367e055795",
        actionUrl: "https://buttonone.com/action",
        interactId: "buttonOneClicked",
        text: {
          content: "ButtonTextOne",
        },
      },
    ],
    image: {
      alt: "",
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRT8gAa1wUx9Ox2M6cZNwUJe32xE-l_4oqPVA&s",
      darkUrl: "https://imageurl.com/dark",
    },
    dismissBtn: {
      style: "simple",
    },
    title: {
      content: "This is large image title",
    },
  },
};

const IMAGE_ONLY_CONTENT_ALL_FIELDS: ContentTemplate = {
  id: "image-only-all-fields",
  type: TemplateType.IMAGE_ONLY,
  imageOnlyData: {
    actionUrl: "https://google.com",
    image: {
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRT8gAa1wUx9Ox2M6cZNwUJe32xE-l_4oqPVA&s",
      darkUrl: "https://imagetoDownload.com/darkimage",
      alt: "flight offer",
    },
    dismissBtn: {
      style: "simple",
    },
  },
};
