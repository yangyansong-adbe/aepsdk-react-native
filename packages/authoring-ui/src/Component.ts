export type ComponentType = 'view' | 'text' | 'image' | 'button' | 'dismissButton';

export interface ComponentStyle {
    [key: string]: string | number | boolean;
}

export interface Component {
    type?: ComponentType;
    style?: ComponentStyle;
    id?: string;
    name?: string;
    // Add interactId for event monitoring
    interactId?: string;
    // Child components
    children?: Component[];
    // Text/Button properties
    content?: string;
    // Image properties
    url?: string;
    darkUrl?: string;
    alt?: string;
    resizeMode?: 'cover' | 'contain' | 'stretch' | 'center' | 'repeat';
    // Dismiss button properties
    dismissType?: 'none' | 'simple' | 'circle';
}