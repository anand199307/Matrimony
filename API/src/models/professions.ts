import { model, Schema } from 'mongoose';

//  createing interface for mothertongues modal

export interface Professions {
    uuid: string,
    name: string,
   
}

const professionsSchema = new Schema<Professions>({
    uuid: { type: String, required: true },
    name: { type: String, required: true },
},
    { timestamps: true, versionKey: false }
);

export const ProfessionsModel = model<Professions>('professions', professionsSchema);