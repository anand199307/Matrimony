import { model, Schema } from 'mongoose';

//  createing interface for mothertongues modal

export interface MotherTongues {
    name: string,
    uuid: string,
}

const mothertonguesSchema = new Schema<MotherTongues>({
    name: { type: String, required: true },
    uuid: { type: String, required: true },

},
    { timestamps: true, versionKey: false }
);

export const MothertonguesModel = model<MotherTongues>('mothertongues', mothertonguesSchema);