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
import { convertSmallImageContentToComponent } from '../src/convertSmallImageContent';
import { SmallImageContentData } from '../src/SmallImageTypes';

describe('Basic Tests', () => {
    it('should convert data to component', () => {
        const data: SmallImageContentData = {
            title: { content: 'Test Title' },
        };

        const result = convertSmallImageContentToComponent(data);

        expect(result.type).toBe('view');
        expect(result.children).toBeDefined();
    });

    it('should handle empty data', () => {
        const data: SmallImageContentData = {
            title: { content: '' },
        };

        const result = convertSmallImageContentToComponent(data);

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