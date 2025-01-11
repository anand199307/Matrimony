import { model, Schema } from 'mongoose';

export interface ICountry {
  name: string;
  code: string;
  lat?: string;
  long?: string;
  region?: string;
  currency?: string;
  currencySymbol?: string;
  phoneCode?: string;
  numericCode?: string;
  externalId?: number;
  uuid: string;
}

const countrySchema: Schema = new Schema<ICountry>(
  {
    name: { type: String, required: true },
    code: { type: String, required: true },
    lat: String,
    long: String,
    region: String,
    currency: String,
    currencySymbol: String,
    phoneCode: String,
    numericCode: String,
    externalId: Number,
    uuid: { type: String, required: true }
  },
  { timestamps: true, versionKey: false }
);

export const CountryModel = model<ICountry>('Country', countrySchema);
