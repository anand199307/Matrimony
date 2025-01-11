import { model, Schema } from 'mongoose';

export interface Dhosam {
    uuid: string,
    name: string
}

const DhosamSchema = new Schema<Dhosam>(
    {
        uuid: { type: String, required: true },
        name: { type: String, required: true }
    },
    { timestamps: true, versionKey: false }
)

export const DhosamModal = model<Dhosam>('dhosams', DhosamSchema);