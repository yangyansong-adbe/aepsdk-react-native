# Authoring-UI Testing Strategy

## Overview

The authoring-ui package provides React Native UI components for rendering dynamic content based on JSON-like component definitions. This document outlines the comprehensive testing strategy for this package.

## Testing Architecture

### 1. Unit Tests

- **Location**: `__tests__/` directory
- **Framework**: Jest + React Native Testing Library
- **Coverage**: Target 80%+ coverage

### 2. Component Tests

- **Focus**: Individual component behavior and props
- **Mocking**: React Native components and hooks
- **Events**: User interactions and callbacks

### 3. Integration Tests

- **Focus**: Component interactions and data flow
- **End-to-end**: Complete rendering pipeline

## Test Categories

### A. ContentView Component Tests (`ContentView.test.tsx`)

#### Test Coverage:

1. **Component Type Rendering**

   - View components with children
   - Text components with content
   - Image components with URLs
   - Button components with titles
   - Dismiss button components

2. **Event Handling**

   - Press events for interactive components
   - Event callback execution
   - InteractId validation
   - Event name consistency

3. **Style Application**

   - Style prop passing
   - Dynamic style updates
   - Color scheme adaptation (light/dark)

4. **Edge Cases**
   - Missing component types
   - Invalid props
   - Undefined callbacks
   - Empty content

#### Key Test Scenarios:

```typescript
// Component rendering
it("renders view component with children", () => {
  const component: Component = {
    type: "view",
    children: [{ type: "text", content: "Test" }],
  };
  // Test implementation
});

// Event handling
it("triggers press event when text is pressed", () => {
  const component: Component = {
    type: "text",
    content: "Clickable",
    interactId: "text-1",
  };
  // Test implementation
});
```

### B. Data Conversion Tests (`convertSmallImageContent.test.ts`)

#### Test Coverage:

1. **Data Transformation**

   - SmallImageContentData to Component conversion
   - Style override application
   - Component hierarchy validation

2. **Feature Support**

   - Image handling (with/without URLs)
   - Button array processing
   - Dismiss button configuration
   - Title and body text

3. **Style Merging**

   - Default styles application
   - Override style merging
   - Style inheritance

4. **Edge Cases**
   - Undefined data
   - Empty objects
   - Missing required fields

#### Key Test Scenarios:

```typescript
// Data conversion
it("converts basic small image content to component", () => {
  const data: SmallImageContentData = {
    title: { content: "Test Title" },
    image: { url: "https://example.com/image.jpg" },
  };
  // Test implementation
});

// Style overrides
it("applies style overrides correctly", () => {
  const styleOverrides: SmallImageContentStyle = {
    card: { backgroundColor: "#ff0000" },
  };
  // Test implementation
});
```

### C. Integration Tests (`SmallImageCard.test.tsx`)

#### Test Coverage:

1. **Component Integration**

   - SmallImageContent + ContentView integration
   - Props passing validation
   - Event flow testing

2. **User Interactions**

   - Button press handling
   - Dismiss button functionality
   - Listener callback execution

3. **Props Validation**
   - Required vs optional props
   - Default prop handling
   - Type safety validation

## Testing Best Practices

### 1. Mocking Strategy

```typescript
// Mock React Native components
jest.mock("react-native", () => ({
  ...jest.requireActual("react-native"),
  useColorScheme: jest.fn(() => "light"),
  Image: "Image",
  Text: "Text",
  View: "View",
}));

// Mock external dependencies
jest.mock("../src/ContentView", () => ({
  ContentView: ({ obj, onEvent }: any) => {
    // Mock implementation
  },
}));
```

### 2. Test Data Management

```typescript
// Create reusable test data
const createTestComponent = (overrides = {}): Component => ({
  type: "text",
  content: "Test Content",
  ...overrides,
});

const createTestData = (overrides = {}): SmallImageContentData => ({
  title: { content: "Test Title" },
  ...overrides,
});
```

### 3. Assertion Patterns

```typescript
// Component rendering
expect(getByText("Test Content")).toBeTruthy();
expect(queryByText("Non-existent")).toBeNull();

// Event handling
expect(mockOnEvent).toHaveBeenCalledWith("interact-id", "press");
expect(mockOnEvent).not.toHaveBeenCalled();

// Component structure
expect(result.children).toHaveLength(2);
expect(result.type).toBe("view");
```

## Coverage Goals

### Target Coverage Metrics:

- **Statements**: 80%
- **Branches**: 80%
- **Functions**: 80%
- **Lines**: 80%

### Critical Paths:

1. All component types (view, text, image, button, dismissButton)
2. Event handling for interactive components
3. Style application and overrides
4. Data conversion logic
5. Error handling and edge cases

## Running Tests

### Commands:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test -- ContentView.test.tsx
```

### Test Environment:

- **Framework**: Jest
- **Environment**: jsdom
- **Preset**: react-native
- **Setup**: Custom setup file with mocks

## Continuous Integration

### Pre-commit Hooks:

- Run unit tests
- Check coverage thresholds
- Validate TypeScript types

### CI Pipeline:

1. Install dependencies
2. Run linting
3. Run unit tests
4. Generate coverage report
5. Upload coverage to CI platform

## Future Enhancements

### 1. Visual Regression Testing

- Screenshot comparison tests
- Component visual validation
- Cross-platform rendering tests

### 2. Performance Testing

- Component render performance
- Memory usage monitoring
- Bundle size analysis

### 3. Accessibility Testing

- Screen reader compatibility
- Keyboard navigation
- Color contrast validation

### 4. Integration with E2E Tests

- Full user journey testing
- Real device testing
- Cross-platform validation

## Troubleshooting

### Common Issues:

1. **Mock not working**: Ensure mocks are defined before imports
2. **Type errors**: Check TypeScript configuration and type definitions
3. **Async test failures**: Use proper async/await patterns
4. **Component not rendering**: Verify test environment setup

### Debug Tips:

- Use `console.log` in test files for debugging
- Check Jest configuration for proper module resolution
- Verify mock implementations match expected interfaces
- Use React DevTools for component inspection in tests
