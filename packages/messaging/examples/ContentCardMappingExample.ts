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

import { ContentProvider, ContentCardMappingManager, Messaging } from '../src';

/**
 * Example demonstrating how to use the ContentProvider with content card mapping
 * for tracking display and interaction events.
 */
export class ContentCardMappingExample {
    private contentProvider: ContentProvider;
    private mappingManager: ContentCardMappingManager;

    constructor(surface: string) {
        this.contentProvider = new ContentProvider(surface);
        this.mappingManager = ContentCardMappingManager.getInstance();
    }

    /**
     * Load content and populate the mapping
     */
    async loadContent() {
        try {
            console.log('Loading content for surface...');
            const templates = await this.contentProvider.getContent();
            console.log(`Loaded ${templates.length} content templates`);

            // Log the mapping information
            const map = this.mappingManager.getContentCardMap();
            console.log(`Content card mapping contains ${map.size} entries`);

            return templates;
        } catch (error) {
            console.error('Error loading content:', error);
            return [];
        }
    }

    /**
     * Handle content card display event
     */
    handleContentCardDisplay(contentCardId: string) {
        console.log('Content card displayed:', contentCardId);

        const mapping = this.mappingManager.getContentCardMapping(contentCardId);
        if (!mapping) {
            console.warn('No mapping found for content card ID:', contentCardId);
            return;
        }

        // Track content card display
        console.log('Tracking content card display for:', contentCardId);
        Messaging.trackContentCardDisplay(mapping.proposition, mapping.contentCard);
    }

    /**
     * Handle content card interaction event
     */
    handleContentCardInteraction(contentCardId: string) {
        console.log('Content card interacted with:', contentCardId);

        const mapping = this.mappingManager.getContentCardMapping(contentCardId);
        if (!mapping) {
            console.warn('No mapping found for content card ID:', contentCardId);
            return;
        }

        // Track content card interaction
        console.log('Tracking content card interaction for:', contentCardId);
        Messaging.trackContentCardInteraction(mapping.proposition, mapping.contentCard);
    }

    /**
     * Get mapping information for debugging
     */
    getMappingInfo() {
        const map = this.mappingManager.getContentCardMap();
        const info: Record<string, boolean> = {};

        for (const [contentCardId, mapping] of map.entries()) {
            info[contentCardId] = !!mapping;
        }

        return {
            totalMappings: map.size,
            mappings: info
        };
    }

    /**
     * Refresh content and mapping
     */
    async refreshContent() {
        console.log('Refreshing content...');
        return await this.loadContent();
    }

    /**
     * Get the singleton mapping manager instance
     */
    getMappingManager() {
        return this.mappingManager;
    }
}

// Usage example:
export async function demonstrateContentCardMapping() {
    const example = new ContentCardMappingExample('home-screen');

    // Load content and populate mapping
    const templates = await example.loadContent();

    // Simulate content card display
    if (templates.length > 0) {
        const firstTemplate = templates[0];
        example.handleContentCardDisplay(firstTemplate.id);
    }

    // Simulate content card interaction
    if (templates.length > 0) {
        const firstTemplate = templates[0];
        example.handleContentCardInteraction(firstTemplate.id);
    }

    // Get mapping information
    const mappingInfo = example.getMappingInfo();
    console.log('Mapping info:', mappingInfo);
}

// Example showing singleton behavior:
export function demonstrateSingletonBehavior() {
    const example1 = new ContentCardMappingExample('surface-1');
    const example2 = new ContentCardMappingExample('surface-2');

    const manager1 = example1.getMappingManager();
    const manager2 = example2.getMappingManager();

    // Both should be the same instance
    console.log('Same singleton instance:', manager1 === manager2); // true

    // Adding a mapping through one instance should be visible to the other
    manager1.addMapping('test-id', {} as any, {} as any);
    console.log('Mapping count in manager2:', manager2.getMappingCount()); // 1
} 