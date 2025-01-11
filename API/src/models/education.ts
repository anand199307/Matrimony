import { model, Schema, Types } from 'mongoose';

export interface EducationDetails {
    _id: Types.ObjectId;
    short_name: string;
    full_name: string;
    uuid: string
}

export interface EducationData {
    department: string;
    departmentDetails?: Types.DocumentArray<EducationDetails>;
    uuid: string
}

const educationSchema = new Schema<EducationData>(
    {
        department: { type: String, required: true },
        uuid: { type: String, required: true },
        departmentDetails: [{ short_name: String, full_name: String, uuid: String }]
    },
    { timestamps: true, versionKey: false }
)

export const EducationModel = model<EducationData>('EducationDetails', educationSchema)