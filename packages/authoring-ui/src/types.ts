export interface SmallImageContentButton {
    interactId: string;
    actionUrl?: string;
    id?: string;
    text: {
        content: string;
    };
}

export interface SmallImageContentData {
    image?: {
        alt?: string;
        url: string;
        darkUrl?: string;
    };
    buttons?: SmallImageContentButton[];
    dismissBtn?: {
        style: "none" | "simple" | "circle";
    };
    actionUrl?: string;
    body?: {
        content: string;
    };
    title: {
        content: string;
    };
}

export interface SmallImageContentStyle {
    card?: {
        backgroundColor?: string;
        borderRadius?: number;
        margin?: number;
        shadowColor?: string;
        shadowOffsetWidth?: number;
        shadowOffsetHeight?: number;
    }
    container?: {
        flexDirection?: string;
        minHeight?: number;
    }
    imageContainer?: {
        backgroundColor?: string;
    }
    image?: {
        width?: number;
        height?: number;
        resizeMode?: string;
    }
    contentContainer?: {
        flex?: number;
        padding?: number;
    }
    textContent?: {
        flex?: number;
        justifyContent?: string;
    }
    buttonContainer?: {
        flexDirection?: string;
        gap?: number;
        justifyContent?: string;
        marginTop?: number;
    }
    title?: {
        fontSize?: number;
        color?: string;
    }
    body?: {
        fontSize?: number;
        color?: string;
        lineHeight?: number;
    }
}