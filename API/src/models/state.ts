import { model, Schema } from 'mongoose';

export interface IState {
  name: string;
  code: string;
  lat?: string;
  long?: string;
  countryId?: string;
  countryExternalId?: number;
  externalId?: number;
  uuid: string;
}

const stateSchema: Schema = new Schema<IState>(
  {
    name: { type: String, required: true },
    code: { type: String, required: true },
    lat: String,
    long: String,
    countryId: String,
    countryExternalId: Number,
    externalId: Number,
    uuid: { type: String, required: true }
  },
  { timestamps: true, versionKey: false }
);

export const StateModel = model<IState>('State', stateSchema);
