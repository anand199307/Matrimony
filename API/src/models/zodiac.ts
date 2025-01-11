import { model, Schema, Types } from 'mongoose';

interface StartDetail {
  _id: Types.ObjectId;
  name: string;
}

export interface IZodiac {
  name: string;
  startDetails?: Types.DocumentArray<StartDetail>;
}

const zodiacSchema: Schema = new Schema<IZodiac>(
  {
    name: { type: String, required: true },
    startDetails: [{ name: String }]
  },
  { timestamps: true, versionKey: false }
);

export const ZodiacModel = model<IZodiac>('Zodiac', zodiacSchema);
