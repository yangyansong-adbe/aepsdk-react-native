// Global test setup
beforeEach(() => {
    jest.clearAllMocks();
});

// Suppress console warnings during tests
const originalWarn = console.warn;
beforeAll(() => {
    console.warn = (...args: any[]) => {
        if (
            typeof args[0] === 'string' &&
            args[0].includes('Warning: ReactDOM.render is no longer supported')
        ) {
            return;
        }
        originalWarn.call(console, ...args);
    };
});

afterAll(() => {
    console.warn = originalWarn;
}); 