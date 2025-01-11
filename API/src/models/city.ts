import { model, Schema } from 'mongoose';

export interface ICity {
  name: string;
  externalId?: number;
  stateId?: string;
  stateExternalId?: number;
  uuid: string;
  lat?: string;
  long?: string;
}

const citySchema: Schema = new Schema<ICity>(
  {
    name: { type: String, required: true },
    lat: String,
    long: String,
    stateId: String,
    stateExternalId: Number,
    externalId: Number,
    uuid: { type: String, required: true }
  },
  { timestamps: true, versionKey: false }
);

export const CityModel = model<ICity>('City', citySchema);
