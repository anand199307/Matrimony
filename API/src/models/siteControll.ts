import { model, Schema } from "mongoose";

// export interface HeroSection {
//     desktopImage: string,
//     mobileImage: string,
//     heroContent: string
// }

// export interface AboutUS {
//     aboutUsImage: string,
//     aboutUsContent: string
// }

export interface SuccessStories {
    id: string
    storyImage: string,
    storyContent: string
}

export interface FAQ {
    id: string
    question: string,
    answer: string
}

export interface SiteControll{
    stories: SuccessStories[],
    faq: FAQ[]
 }

const siteControllSchema = new Schema<SiteControll>({
    stories: { type: [Object], required: false },
    faq: { type: [Object], required: false }
},
{ timestamps: true, versionKey: false }
);

// Create and export the Mongoose model using the schema
export const SiteControllModel = model<SiteControll>('SiteControll', siteControllSchema);
