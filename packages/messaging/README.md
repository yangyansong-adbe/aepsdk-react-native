# AEP Messaging React Native

Adobe Experience Platform Messaging extension for React Native.

## Installation

```bash
npm install @adobe/react-native-aep-messaging
```

## Usage

### Basic Usage

```typescript
import { Messaging } from "@adobe/react-native-aep-messaging";

// Get propositions for surfaces
const propositions = await Messaging.getPropositionsForSurfaces([
  "home-screen",
]);

// Track content card display
Messaging.trackContentCardDisplay(proposition, contentCard);

// Track content card interaction
Messaging.trackContentCardInteraction(proposition, contentCard);
```

### Content Card Mapping with Singleton Manager

The `ContentCardMappingManager` is a singleton that provides centralized management of content card mappings. This allows multiple components to share the same mapping state.

```typescript
import {
  ContentProvider,
  ContentCardMappingManager,
} from "@adobe/react-native-aep-messaging";

// Create a content provider for a specific surface
const contentProvider = new ContentProvider("home-screen");

// Get the singleton mapping manager
const mappingManager = ContentCardMappingManager.getInstance();

// Get content templates and populate the mapping
const contentTemplates = await contentProvider.getContent();

// Get the mapping of content card ID to content card and proposition objects
const contentCardMap = mappingManager.getContentCardMap();

// Get specific mapping for a content card ID
const mapping = mappingManager.getContentCardMapping("content-card-id-123");

if (mapping) {
  // Track content card display
  Messaging.trackContentCardDisplay(mapping.proposition, mapping.contentCard);

  // Track content card interaction
  Messaging.trackContentCardInteraction(
    mapping.proposition,
    mapping.contentCard
  );
}
```

### Using ContentView with Tracking

```typescript
import {
  ContentView,
  ContentProvider,
  ContentCardMappingManager,
} from "@adobe/react-native-aep-messaging";

const MyComponent = () => {
  const [contentProvider] = useState(() => new ContentProvider("home-screen"));
  const [contentTemplates, setContentTemplates] = useState([]);
  const mappingManager = ContentCardMappingManager.getInstance();

  useEffect(() => {
    const loadContent = async () => {
      const templates = await contentProvider.getContent();
      setContentTemplates(templates);
    };
    loadContent();
  }, []);

  const handleContentInteraction = (
    event: string,
    componentIdentifier: string | null
  ) => {
    if (event === "onDisplay" && componentIdentifier) {
      // Get the mapping for this content card
      const mapping = mappingManager.getContentCardMapping(componentIdentifier);
      if (mapping) {
        Messaging.trackContentCardDisplay(
          mapping.proposition,
          mapping.contentCard
        );
      }
    }

    if (event === "buttonClick" && componentIdentifier) {
      // Get the mapping for this content card
      const mapping = mappingManager.getContentCardMapping(componentIdentifier);
      if (mapping) {
        Messaging.trackContentCardInteraction(
          mapping.proposition,
          mapping.contentCard
        );
      }
    }
  };

  return (
    <div>
      {contentTemplates.map((template) => (
        <ContentView
          key={template.id}
          data={template}
          listener={handleContentInteraction}
        />
      ))}
    </div>
  );
};
```

## API Reference

### ContentCardMappingManager (Singleton)

#### `getInstance(): ContentCardMappingManager`

Returns the singleton instance of the ContentCardMappingManager.

#### `getContentCardMap(): Map<string, ContentCardMapping>`

Returns the mapping of content card ID to its corresponding content card and proposition objects.

#### `getContentCardMapping(contentCardId: string): ContentCardMapping | undefined`

Gets the content card and proposition objects for a given content card ID.

#### `addMapping(contentCardId: string, contentCard: ContentCard, proposition: MessagingProposition): void`

Adds a mapping for a content card ID with its corresponding content card and proposition objects.

#### `removeMapping(contentCardId: string): boolean`

Removes a mapping for a specific content card ID. Returns true if the mapping was removed, false if it didn't exist.

#### `clearMappings(): void`

Clears all mappings.

#### `hasMapping(contentCardId: string): boolean`

Checks if a mapping exists for a given content card ID.

#### `getMappingCount(): number`

Gets the total number of mappings.

#### `getAllContentCardIds(): string[]`

Gets all content card IDs that have mappings.

### ContentProvider

#### `getContentCardMap(): Map<string, ContentCardMapping>`

Returns the mapping of content card ID to its corresponding content card and proposition objects.

#### `getContentCardMapping(contentCardId: string): ContentCardMapping | undefined`

Gets the content card and proposition objects for a given content card ID.

#### `getContent(): Promise<ContentTemplate[]>`

Fetches content templates and populates the content card mapping.

### ContentCardMapping

```typescript
interface ContentCardMapping {
  contentCard: ContentCard;
  proposition: MessagingProposition;
}
```

## Singleton Benefits

The singleton pattern provides several benefits:

1. **Shared State**: All components can access the same mapping data
2. **Memory Efficiency**: Only one instance manages all mappings
3. **Consistency**: Ensures all parts of the application use the same mapping state
4. **Centralized Management**: All mapping operations go through a single point

## License

See [LICENSE](LICENSE) for more information.
