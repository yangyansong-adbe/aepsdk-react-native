import { Component, ComponentType } from './Component';
import { SmallImageContentData, SmallImageContentStyle } from './types';

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
        minHeight: 120, // Match card minHeight
    },
    imageContainer: {
        backgroundColor: '#f0f0f0',
        borderTopLeftRadius: 12,
        borderBottomLeftRadius: 12,
        width: 120, // Changed to 25% of the container width
        height: "100%", // Fill the entire height
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
    textContent: {
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
                            style: mergedStyles.textContent,
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
            interactId: 'dismiss', // Standard interactId for dismiss button
            dismissType: data.dismissBtn.style,
        });
    }

    return {
        type: 'view',
        style: mergedStyles.card,
        children,
    };
} 