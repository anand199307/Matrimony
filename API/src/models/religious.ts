import { model, Schema } from 'mongoose';

export interface Religious {
    name: string,
    uuid: string,
}

export interface Caste {
    name: string,
    uuid: string,
}

const religiousSchema = new Schema<Religious>({
    name: { type: String, required: true },
    uuid: { type: String, required: true },

},
    { timestamps: true, versionKey: false }
);

const castSchema = new Schema<Caste>({
    name: { type: String, required: true },
    uuid: { type: String, required: true },

},
    { timestamps: true, versionKey: false }
);

export const ReligiousModel = model<Religious>('religious', religiousSchema);
export const CasteModal = model<Caste>('caste',castSchema);