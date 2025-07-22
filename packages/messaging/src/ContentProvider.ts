import { SmallImageContentData } from "@adobe/react-native-aep-authoring-ui";
import Messaging from "./Messaging";
import { PersonalizationSchema } from "./models/PersonalizationSchema";
import { ContentCard } from "./models/ContentCard";
import { ContentCardMappingManager } from "./ContentCardMappingManager";

/** Represents template types for AepUI templates. */
export enum TemplateType {
    /** Represents a small image template type. */
    SMALL_IMAGE = "SmallImage",
    /** Represents a large image template type. */
    LARGE_IMAGE = "LargeImage",
    /** Represents a image only template type. */
    IMAGE_ONLY = "ImageOnly"
}

interface LargeImageContentData {

}
interface ImageOnlyData {
}

export interface ContentTemplate {
    readonly id: string; // content card id
    readonly type: TemplateType;
    // Use Record<string, unknown> to present the free-formed JSON objects
    readonly smallImageData?: SmallImageContentData;
    readonly largeImageData?: LargeImageContentData;
    readonly imageOnlyData?: ImageOnlyData;
    // TODO: figure out using which identifier to identify the content card
    readonly identifier?: string;
}

export class ContentProvider {

    private mappingManager: ContentCardMappingManager;

    constructor(private readonly surface: string) {
        this.mappingManager = ContentCardMappingManager.getInstance();
    }
    /**
     * Updates the flow observer returned by getContent() with the latest cached content cards for the given
     * surface.
     */
    async refreshContent(): Promise<void> {
        // Implementation to be added
        throw new Error('Method not implemented');
    }

    /**
 * Initiates fetching of AepUI instances for the given surface.
 *
 * This function fetches new content by invoking getAepUITemplateList(), which retrieves
 * propositions and builds a list of AepUI.
 *
 * @returns A Promise that resolves to a Result containing lists of AepUITemplate.
 */
    async getContent(): Promise<ContentTemplate[]> {
        console.log(this.surface);
        const messages = await Messaging.getPropositionsForSurfaces([this.surface]);
        console.log(messages);
        const propositions = messages[this.surface];
        const list: ContentTemplate[] = [];

        for (const proposition of propositions) {
            for (const item of proposition.items) {
                if (item.schema === PersonalizationSchema.CONTENT_CARD) {
                    const contentCard = item as ContentCard;

                    // Add to the mapping manager for tracking purposes
                    this.mappingManager.addMapping(contentCard.id, contentCard, proposition);

                    list.push({
                        id: contentCard.id,
                        type: TemplateType.SMALL_IMAGE,
                        smallImageData: contentCard.data.content
                    })
                }
            }
        }

        return list;
        // return [{
        //     type: TemplateType.SMALL_IMAGE,
        //     smallImageData: SMALL_IMAGE_CONTENT
        // }]
    }
}

// const SMALL_IMAGE_CONTENT: SmallImageContentData = {
//     "image": {
//         "alt": "",
//         "url": "https://cdn-icons-png.flaticon.com/256/3303/3303838.png"
//     },
//     "buttons": [
//         {
//             "interactId": "downloadClicked",
//             "actionUrl": "https://nba.com",
//             "id": "5b4d53f5-45bd-4e5c-a5cb-6e650b1993f6",
//             "text": {
//                 "content": "Download App"
//             }
//         }
//     ],
//     "dismissBtn": {
//         "style": "circle"
//     },
//     "actionUrl": "",
//     "body": {
//         "content": "Get live scores, real-time updates, and exclusive content right at your fingertips."
//     },
//     "title": {
//         "content": "Stay connected to all the action"
//     }
// }