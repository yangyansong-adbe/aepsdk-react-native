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
    textContainer?: {
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