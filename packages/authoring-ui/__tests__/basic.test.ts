import { convertSmallImageContentToComponent } from '../src/convertSmallImageContent';
import { SmallImageContentData } from '../src/types';

describe('Basic Tests', () => {
    it('should convert data to component', () => {
        const data: SmallImageContentData = {
            title: { content: 'Test Title' },
        };

        const result = convertSmallImageContentToComponent(data);

        expect(result.type).toBe('view');
        expect(result.children).toBeDefined();
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

        expect(result.children).toHaveLength(2);
        const dismissButton = result.children![1];
        expect(dismissButton.type).toBe('dismissButton');
        expect(dismissButton.dismissType).toBe('simple');
    });
}); 