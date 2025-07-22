export interface SmallImageContentButton {
    readonly interactId: string;
    readonly actionUrl?: string;
    readonly id?: string;
    readonly text: {
        readonly content: string;
    };
}

export interface SmallImageContentData {
    readonly image?: {
        readonly alt?: string;
        readonly url: string;
        readonly darkUrl?: string;
    };
    readonly buttons?: readonly SmallImageContentButton[];
    readonly dismissBtn?: {
        readonly style: "none" | "simple" | "circle";
    };
    readonly actionUrl?: string;
    readonly body?: {
        readonly content: string;
    };
    readonly title: {
        readonly content: string;
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