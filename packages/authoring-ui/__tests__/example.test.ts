import { convertSmallImageContentToComponent } from '../src/convertSmallImageContent';
import { SmallImageContentData } from '../src/types';

describe('Example Tests', () => {
    describe('convertSmallImageContentToComponent', () => {
        it('should convert basic data to component', () => {
            const data: SmallImageContentData = {
                title: { content: 'Test Title' },
                body: { content: 'Test Body' },
            };

            const result = convertSmallImageContentToComponent(data);

            expect(result.type).toBe('view');
            expect(result.children).toBeDefined();
            expect(result.children!.length).toBe(1);
        });

        it('should handle undefined data', () => {
            const result = convertSmallImageContentToComponent(undefined);

            expect(result.type).toBe('view');
            expect(result.children).toBeDefined();
        });

        it('should include dismiss button when specified', () => {
            const data: SmallImageContentData = {
                title: { content: 'Test Title' },
                dismissBtn: { style: 'simple' },
            };

            const result = convertSmallImageContentToComponent(data);

            expect(result.children).toHaveLength(2); // Main content + dismiss button
            const dismissButton = result.children![1];
            expect(dismissButton.type).toBe('dismissButton');
            expect(dismissButton.dismissType).toBe('simple');
        });

        it('should not include dismiss button when style is none', () => {
            const data: SmallImageContentData = {
                title: { content: 'Test Title' },
                dismissBtn: { style: 'none' },
            };

            const result = convertSmallImageContentToComponent(data);

            expect(result.children).toHaveLength(1); // Only main content
        });
    });
}); 