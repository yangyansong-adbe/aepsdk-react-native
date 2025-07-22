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
import { Component, ComponentType } from './common/Component';
import { SmallImageContentData, SmallImageContentStyle } from './SmallImageTypes';

const styles = {
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        overflow: 'hidden',
        margin: 15,
        shadowColor: '#000',
        shadowOffsetWidth: 0, // flattened
        shadowOffsetHeight: 2, // flattened
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        position: 'relative', // Added for dismiss button positioning
        minHeight: 120, // Add minimum height for the card
        maxHeight: 160,
        width: '100%', // Ensure card takes full width
    },
    container: {
        flexDirection: 'row',
        minHeight: 120,
    },
    imageContainer: {
        backgroundColor: '#f0f0f0',
        borderTopLeftRadius: 12,
        borderBottomLeftRadius: 12,
        width: "35%",
        height: "100%",
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    contentContainer: {
        flex: 1,
        padding: 16,
        justifyContent: 'space-between',
        minHeight: 120, // Match card minHeight
    },
    textContainer: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 8,
        justifyContent: 'flex-end', // Changed from 'flex-start' to 'flex-end' for right alignment
        marginTop: 12,
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000000',
        marginBottom: 8,
    },
    body: {
        fontSize: 14,
        color: '#666666',
        lineHeight: 20,
    },
};

export function convertSmallImageContentToComponent(
    data?: SmallImageContentData,
    styleOverrides?: SmallImageContentStyle
): Component {
    // Shallow merge default styles with overrides
    const mergedStyles = { ...styles, ...styleOverrides };

    const children: Component[] = [
        {
            type: 'view',
            style: mergedStyles.container,
            children: [
                ...(data?.image?.url ? [{
                    type: 'view' as ComponentType,
                    style: mergedStyles.imageContainer,
                    children: [{
                        type: 'image' as ComponentType,
                        style: mergedStyles.image,
                        url: data.image.url,
                        darkUrl: data.image?.darkUrl,
                        alt: data.image.alt || '',
                    }],
                }] : []),
                {
                    type: 'view' as ComponentType,
                    style: mergedStyles.contentContainer,
                    children: [
                        {
                            type: 'view' as ComponentType,
                            style: mergedStyles.textContainer,
                            children: [
                                ...(data?.title?.content ? [{
                                    type: 'text' as ComponentType,
                                    style: mergedStyles.title,
                                    content: data.title.content,
                                }] : []),
                                ...(data?.body?.content ? [{
                                    type: 'text' as ComponentType,
                                    style: mergedStyles.body,
                                    content: data.body.content,
                                }] : []),
                            ],
                        },
                        ...(Array.isArray(data?.buttons) && data.buttons.length > 0 ? [{
                            type: 'view' as ComponentType,
                            style: mergedStyles.buttonContainer,
                            children: data.buttons.map(btn => ({
                                type: 'button' as ComponentType,
                                interactId: btn.interactId,
                                actionUrl: btn.actionUrl,
                                id: btn.id,
                                content: btn.text.content, // Changed from text to content
                            })),
                        }] : []),
                    ],
                },
            ],
        },
    ];

    // Add dismiss button if present and style is not 'none'
    if (data?.dismissBtn?.style && data.dismissBtn.style !== 'none') {
        children.push({
            type: 'dismissButton' as ComponentType,
            interactId: 'dismiss_button', // Standard interactId for dismiss button
            dismissType: data.dismissBtn.style,
        });
    }

    return {
        type: 'view',
        style: mergedStyles.card,
        children,
    };
} 